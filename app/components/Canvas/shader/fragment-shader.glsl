#version 300 es

precision mediump float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

vec3 palette(float t) {
  vec3 a = vec3(0.0f, 0.0f, 0.0f);
  vec3 b = vec3(0.5f, 0.5f, 0.5f);
  vec3 c = vec3(1.0f, 1.0f, 1.0f);
  vec3 d = vec3(0.263f, 0.416f, 0.557f);

  return a + b * cos(6.28318f * (c * t + d));
}

out vec4 outputColor;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.f - iResolution) / iResolution.x;

  float d = length(uv);
  d = abs(sin(-d + iTime * 0.5f));
  d = fract(d);

  float r = abs(sin(d - iTime * .25f));
  float g = abs(sin(d - iTime * .5f));
  float b = abs(sin(d - iTime * .65f));

  outputColor = vec4(r, g, b, 1.0f);
}
