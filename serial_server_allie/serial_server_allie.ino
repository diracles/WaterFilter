void setup() {
  Serial.begin(9600);
  
  Serial.setTimeout(10);
   //pinMode(5, INPUT); 

}

void loop() {
  
  int sensor1value = analogRead(A0);
  int sensor2value = analogRead(A2);
  
  Serial.print("s1 ");
  Serial.println(sensor1value);
  
  delay(500);
  
  Serial.print("s2 ");
  Serial.println(sensor2value);
  
  delay(500);
  

  
  
}
