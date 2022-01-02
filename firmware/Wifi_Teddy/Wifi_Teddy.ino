#include <WiFi.h>
#include <SPIFFS.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include "Wifi_Info.h"
#include "Sound_Data.h"

AsyncWebServer server(80);

const int LED_BUILTIN = 2;
bool ledIsOn = false;
bool playAudio = false;
uint8_t audioSample = 1;

void toggleLED()
{
  ledIsOn = !ledIsOn;

  if (ledIsOn)
  {
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else
  {
    digitalWrite(LED_BUILTIN, LOW);
  }

  return;
}

void turnLEDOff()
{
  ledIsOn = false;
  digitalWrite(LED_BUILTIN, LOW);
}

// void playSound(uint8_t audioSampleIndex)
// {
//   // http://soundfile.sapp.org/doc/WaveFormat/
//   // Wave data starts at byte 44
//   for (uint16_t i = 44; i < sizeof(Pika_Pika); i++) {
//     // Delay - sample rate is 8000Hz
//     // Delay in ms = 1 / sample rate = 1 / 8000 = 125uS
//     unsigned long timeout = micros() + 125UL;
//     // Turn on LED if above a threshold
//     if (Pika_Pika[i] > 150) {
//       toggleLED();
//     }
//     while (micros() < timeout);
//     // Set DAC voltage
//     dacWrite(DAC1, (uint8_t)(Pika_Pika[i] / 2));
//   }
//   // Set DAC pin low when playing is finished
//   dacWrite(DAC1, 0);
//   turnLEDOff();
// }

void playSound(uint8_t audioSampleIndex)
{
  // http://soundfile.sapp.org/doc/WaveFormat/
  // Wave data starts at byte 44

  if (audioSampleIndex == 1)
  {
    for (uint16_t i = 44; i < sizeof(Pika_Pika); i++)
    {
      // Delay - sample rate is 8000Hz
      // Delay in ms = 1 / sample rate = 1 / 8000 = 125uS
      unsigned long timeout = micros() + 125UL;
      // Turn on LED if above a threshold
      if (Pika_Pika[i] > 150)
      {
        toggleLED();
      }
      while (micros() < timeout)
        ;
      // Set DAC voltage
      dacWrite(DAC1, (uint8_t)(Pika_Pika[i] / 2));
    }
  }
  else if (audioSampleIndex == 2)
  {
    for (uint16_t i = 44; i < sizeof(Pika_Scream); i++)
    {
      // Delay - sample rate is 8000Hz
      // Delay in ms = 1 / sample rate = 1 / 8000 = 125uS
      unsigned long timeout = micros() + 125UL;
      // Turn on LED if above a threshold
      if (Pika_Scream[i] > 150)
      {
        toggleLED();
      }
      while (micros() < timeout)
        ;
      // Set DAC voltage
      dacWrite(DAC1, (uint8_t)(Pika_Scream[i] / 2));
    }
  }
  else if (audioSampleIndex == 3)
  {
    for (uint16_t i = 44; i < sizeof(Chewbacca); i++)
    {
      // Delay - sample rate is 8000Hz
      // Delay in ms = 1 / sample rate = 1 / 8000 = 125uS
      unsigned long timeout = micros() + 125UL;
      // Turn on LED if above a threshold
      if (Chewbacca[i] > 150)
      {
        toggleLED();
      }
      while (micros() < timeout)
        ;
      // Set DAC voltage
      dacWrite(DAC1, (uint8_t)(Chewbacca[i] / 2));
    }
  }

  // Set DAC pin high when playing is finished - to prevent NPN transistor heating up
  dacWrite(DAC1, 128);
  turnLEDOff();
}

void setup()
{
  Serial.begin(115200);

  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  if (!SPIFFS.begin())
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println(WiFi.localIP());

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(SPIFFS, "/index.html", "text/html"); });

  server.on("/index.css", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(SPIFFS, "/index.css", "text/css"); });

  server.on("/index.js", HTTP_GET, [](AsyncWebServerRequest *request)
            { request->send(SPIFFS, "/index.js", "text/javascript"); });

  server.on("/toggle", HTTP_GET, [](AsyncWebServerRequest *request)
            {
              toggleLED();
              char buf[20];
              snprintf(buf, 20, "{\"led\": %d}", ledIsOn);
              request->send(200, "application/json", buf);
            });

  server.on("/status", HTTP_GET, [](AsyncWebServerRequest *request)
            {
              char buf[20];
              snprintf(buf, 20, "{\"led\": %d}", ledIsOn);
              request->send(200, "application/json", buf);
            });

  server.on("/play1", HTTP_GET, [](AsyncWebServerRequest *request)
            {
              playAudio = true;
              audioSample = 1;
              char buf[20];
              snprintf(buf, 20, "{\"playing\": %d}", playAudio);
              request->send(200, "application/json", buf);
            });

  server.on("/play2", HTTP_GET, [](AsyncWebServerRequest *request)
            {
              playAudio = true;
              audioSample = 2;
              char buf[20];
              snprintf(buf, 20, "{\"playing\": %d}", playAudio);
              request->send(200, "application/json", buf);
            });

  server.on("/play3", HTTP_GET, [](AsyncWebServerRequest *request)
            {
              playAudio = true;
              audioSample = 3;
              char buf[20];
              snprintf(buf, 20, "{\"playing\": %d}", playAudio);
              request->send(200, "application/json", buf);
            });
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  server.begin();
}

void loop()
{
  // Play audio
  // 1. If not already playing
  // 2. If play audio flag is set
  if (playAudio)
  {
    Serial.println("Playing...");
    playSound(audioSample);
    playAudio = false; // Reset the flag
    Serial.println("Playing stopped");
  }
}