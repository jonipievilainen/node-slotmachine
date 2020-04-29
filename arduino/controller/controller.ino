int winLed = 3;
int winButton = 4;

int slot1Led = 5;
int slot1Button = 6;

int slot2Led = 7;
int slot2Button = 8;

int slot3Led = 9;
int slot3Button = 10;

int playLed = 11;
int playButton = 12;


int pushButton = 3;

void setup() {
  Serial.begin(9600);
  
  pinMode(winButton, OUTPUT);
  pinMode(slot1Button, OUTPUT);
  pinMode(slot2Button, OUTPUT);
  pinMode(slot3Button, OUTPUT);
  pinMode(playButton, OUTPUT);

  pinMode(winLed, INPUT);
  pinMode(slot1Led, INPUT);
  pinMode(slot2Led, INPUT);
  pinMode(slot3Led, INPUT);
  pinMode(playLed, INPUT);
}

void loop() {

  int winButtonState = digitalRead(winButton);
  int slot1ButtonState = digitalRead(slot1Button);
  int slot2ButtonState = digitalRead(slot2Button);
  int slot3ButtonState = digitalRead(slot3Button);
  int playButtonState = digitalRead(playButton);

  
  if (winButtonState == HIGH) {
    digitalWrite(winLed, HIGH);
    delay(500);
  }

  if (slot1ButtonState == HIGH) {
    digitalWrite(slot1Led, HIGH);
    delay(500);
  }

  if (slot2ButtonState == HIGH) {
    digitalWrite(slot2Led, HIGH);
    delay(500);
  }

  if (slot3ButtonState == HIGH) {
    digitalWrite(slot3Led, HIGH);
    delay(500);
  }

  if (playButtonState == HIGH) {
    digitalWrite(playLed, HIGH);
    delay(500);
  }

  digitalWrite(winLed, LOW);
  digitalWrite(slot1Led, LOW);
  digitalWrite(slot2Led, LOW);
  digitalWrite(slot3Led, LOW);
  digitalWrite(playLed, LOW);
  
  delay(100);        // delay in between reads for stability
}
