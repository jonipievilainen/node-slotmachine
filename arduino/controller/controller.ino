int playLed     = 11;
int playButton  = 12;

int col1Led     = 9;
int col1Button  = 10;

int col2Led     = 7;
int col2Button  = 8;

int col3Led     = 5;
int col3Button  = 6;

int winLed      = 3;
int winButton   = 4;



void setup() {

  Serial.begin(9600);

  pinMode(playLed,    OUTPUT);
  pinMode(playButton, INPUT);
  pinMode(col1Led,    OUTPUT);
  pinMode(col1Button, INPUT);
  pinMode(col2Led,    OUTPUT);
  pinMode(col2Button, INPUT);
  pinMode(col3Led,    OUTPUT);
  pinMode(col3Button, INPUT);
  pinMode(winLed,     OUTPUT);
  pinMode(winButton,  INPUT);
}

void loop() {


  int playButtonState = digitalRead(playButton);
  int col1ButtonState = digitalRead(col1Button);
  int col2ButtonState = digitalRead(col2Button);
  int col3ButtonState = digitalRead(col3Button);
  int winButtonState  = digitalRead(winButton);
  
  Serial.println(playButtonState);

  if (Serial.available()) {
    int state = Serial.parseInt();

    Serial.println(state);

    /*
    if (state == 1) {
      digitalWrite(playLed, HIGH);
      delay(500);
      digitalWrite(playLed, LOW);
    }

    if (state == 2) {
      digitalWrite(col1Led, HIGH);
      delay(500);
      digitalWrite(col1Led, LOW);
    }
    */
  }
  
  delay(100);        // delay in between reads for stability
}
