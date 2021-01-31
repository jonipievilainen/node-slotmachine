int frontSensorPin = A0;
int backSensorPin = A1;
int frontSensorValue = 0;
int backSensorValue = 0;

int counter = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  frontSensorValue = analogRead(frontSensorPin);
  backSensorValue = analogRead(backSensorPin);
  
  // Serial.println(frontSensorValue);
  //Serial.println(backSensorValue);
  //Serial.println(999999);

  if ( ( frontSensorValue == backSensorValue ) && ( frontSensorValue > 1020 ) && ( backSensorValue > 1020 ) ) {
    counter++;
  }

  Serial.println(counter);
  
  delay(100);
}
