//**************************************************************//
//  Name    : Combined Shift Register and MUX Control           //
//  Author  : Modified for Integration                          //
//  Date    : 26 Dec, 2024                                      //
//  Version : 1.3                                               //
//  Notes   : Supports up to 8 Channels and Q pairs             //
//****************************************************************

#include <light_CD74HC4067.h>

// Pin configuration for the 74HC595 shift register
int latchPin = 11;
int clockPin = 10;
int dataPin = 12;

// Pin configuration for the CD74HC4067 multiplexer
CD74HC4067 mux(8, 7, 6, 5); // s0, s1, s2, s3 select pins
const int signal_pin = A4;  // Pin A4 - Connected to Sig pin of CD74HC4067

// State tracking for channels
bool channelStates[8] = {false, false, false, false, false, false, false, false}; // Q1-Q8
bool lastChannelStates[8] = {false, false, false, false, false, false, false, false};

void setup() {
    // Initialize Serial Monitor
    Serial.begin(9600);

    // Set pins for shift register as outputs
    pinMode(latchPin, OUTPUT);
    pinMode(clockPin, OUTPUT);
    pinMode(dataPin, OUTPUT);

    // Set the signal pin for the multiplexer as input
    pinMode(signal_pin, INPUT);
}

void loop() {
    // Check channel inputs and update states
    updateChannelStates();

    // Update LEDs based on channel states
    updateShiftRegister();
}

void updateChannelStates() {
    for (byte i = 0; i < 8; i++) { // Check channels 0 through 7
        mux.channel(i);
        int val = analogRead(signal_pin); // Read analog value

        // If value exceeds threshold and state changes, toggle the state
        if (val > 950 && !lastChannelStates[i]) {
            channelStates[i] = !channelStates[i];
            Serial.println("Channel " + String(i) + " toggled to " + String(channelStates[i] ? "HIGH" : "LOW"));
        }

        // Update last state
        lastChannelStates[i] = (val > 950);
    }
}

void updateShiftRegister() {
    byte outputData = 0b00000000;

    // Map channel states to corresponding bits
    if (channelStates[6]) outputData |= 0b00000001; // Q1 -> Bit 0 // Start game
    if (channelStates[1]) outputData |= 0b00000010; // Q2 -> Bit 1 // Set bet
    if (channelStates[2]) outputData |= 0b00000100; // Q3 -> Bit 2 // Line 1
    if (channelStates[3]) outputData |= 0b00001000; // Q4 -> Bit 3 // Line 2
    if (channelStates[4]) outputData |= 0b00010000; // Q5 -> Bit 4 // Line 3
    if (channelStates[5]) outputData |= 0b00100000; // Q6 -> Bit 5 // Cash out
    if (channelStates[0]) outputData |= 0b01000000; // Q7 -> Bit 6
    if (channelStates[7]) outputData |= 0b10000000; // Q8 -> Bit 7

    // Shift out the data to update LEDs
    shiftOutData(outputData);
}

void shiftOutData(byte data) {
    // Take the latchPin low so the LEDs don't change while sending bits
    digitalWrite(latchPin, LOW);

    // Shift out the bits
    shiftOut(dataPin, clockPin, MSBFIRST, data);

    // Print debug information to Serial Monitor
    Serial.println("Shifted Out Data: " + String(data, BIN));

    // Take the latch pin high so the LEDs light up
    digitalWrite(latchPin, HIGH);
}
