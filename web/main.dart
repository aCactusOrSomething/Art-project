import 'dart:html';
import 'dart:math';
import 'dart:svg';

DivElement output;
Random random;
SvgSvgElement svg;

final int WIDTH = 800;
final int HEIGHT = 600;
void main() {
  output = document.querySelector("#output");
  random = new Random();

  svg = new SvgSvgElement();
  svg.setAttribute("width", "$WIDTH");
  svg.setAttribute("height", "$HEIGHT");
  doThingsToSvg();
  output.append(svg);
}

//for simplicity it's all grayscale.
String getRandomColor() {
  String ret = "";
  int myShade = random.nextInt(256);
  ret = "rgb($myShade, $myShade, $myShade)";
  return ret;
}

void doThingsToSvg() {
  svg.style.backgroundColor = getRandomColor();
  int numElements = random.nextInt(50) + 25;
  for(int i = 0; i < numElements; i++) {
    int type = random.nextInt(3);
    if(type == 0) {
      drawCircle();
    }
    if(type == 1) {
      drawTriangle();
    }
    if(type == 2) {
      drawLine();
    }
  }
}

void drawCircle() {
  CircleElement ret = new CircleElement();
  ret.setAttribute("cx","${random.nextInt(WIDTH)}");
  ret.setAttribute("cy", "${random.nextInt(HEIGHT)}");
  ret.setAttribute("r", "${random.nextInt(40) + 10}");
  String color = getRandomColor();
  ret.setAttribute("stroke", "$color");
  ret.setAttribute("fill", "$color");
  svg.append(ret);
}

void drawTriangle() {
  PolylineElement triangle = new PolylineElement();
  int startX = random.nextInt(WIDTH);
  int startY = random.nextInt(HEIGHT);

  int nextX = startX - 50 + random.nextInt(100);
  int nextY = startY - 50 + random.nextInt(100);

  int endX = nextX - 50 + random.nextInt(60);
  int endY = nextY - 50 + random.nextInt(60);

  String color = getRandomColor();
  triangle.setAttribute("stroke", color);
  triangle.setAttribute("fill", color);

  triangle.setAttribute("points", "$startX,$startY $nextX,$nextY $endX,$endY");
  svg.append(triangle);
}

void drawLine() {
  PolylineElement line = new PolylineElement();
  int startX = random.nextInt(WIDTH);
  int startY = random.nextInt(HEIGHT);

  int nextX = startX - 50 + random.nextInt(100);
  int nextY = startY - 50 + random.nextInt(100);


  String color = getRandomColor();
  line.setAttribute("stroke", color);
  line.setAttribute("fill", color);
  line.setAttribute("stroke-width", "${1 + random.nextInt(6)}");

  line.setAttribute("points", "$startX,$startY $nextX,$nextY");
  svg.append(line);
}