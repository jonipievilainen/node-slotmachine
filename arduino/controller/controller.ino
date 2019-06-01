int pushButton = 3;

void setup() {
  pinMode(5, OUTPUT);
  pinMode(7, OUTPUT);
  Serial.begin(9600);
  pinMode(pushButton, INPUT);
}

void loop() {
  int buttonState = digitalRead(pushButton);
  
  Serial.println(buttonState);

  if (Serial.available()) {
    int state = Serial.parseInt();

    // Serial.println(state);

    if (state == 1) {
      digitalWrite(5, HIGH);
      delay(500);
      digitalWrite(5, LOW);
    }

    if (state == 2) {
      digitalWrite(7, HIGH);
      delay(500);
      digitalWrite(7, LOW);
    }
  }
  
  delay(100);        // delay in between reads for stability
}
