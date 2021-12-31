#include <WiFi.h>
#include <SPIFFS.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include "Wifi_Info.h"

AsyncWebServer server(80);

const int LED_BUILTIN = 2;
bool ledIsOn = false;

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

  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  server.begin();
}

void loop() {}