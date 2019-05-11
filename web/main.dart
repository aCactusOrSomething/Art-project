import 'dart:html';
import 'dart:math';
import 'dart:svg';
import 'dart:async';

import 'package:DollLibCorrect/DollRenderer.dart';

DivElement output;
Random random;
SvgSvgElement svg;
bool isGreyscale;

final int WIDTH = 800;
final int HEIGHT = 600;
void main() {
  output = document.querySelector("#output");

  random = new Random();
  isGreyscale = random.nextBool();

  svg = new SvgSvgElement();
  svg.setAttribute("width", "$WIDTH");
  svg.setAttribute("height", "$HEIGHT");
  /*svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.right = "0";
  svg.style.zIndex = "0";*/
  doThingsToSvg();
  output.append(svg);
}

//for simplicity it's all grayscale.
String getRandomColor() {
  String ret = "";
  if(isGreyscale) {
    int myShade = random.nextInt(256);
    ret = "rgb($myShade, $myShade, $myShade)";
  } else {
    ret = "hsl(${random.nextInt(361)}, ${random.nextInt(101)}%, ${random.nextInt(100)}%)";
  }
  return ret;

}

void doThingsToSvg() {
  svg.style.backgroundColor = getRandomColor();
  int numElements = random.nextInt(50) + 25;
  for(int i = 0; i < numElements; i++) {
    int type = random.nextInt(4);
    if(type == 0) {
      drawCircle();
    }
    if(type == 1) {
      drawTriangle();
    }
    if(type == 2) {
      drawLine();
    }
    if(type == 3) {
      drawDoll();
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

  int nextX = startX - 100 + random.nextInt(200);
  int nextY = startY - 100 + random.nextInt(200);

  int endX = nextX - 100 + random.nextInt(200);
  int endY = nextY - 100 + random.nextInt(200);

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

  int nextX = startX - 100 + random.nextInt(200);
  int nextY = startY - 100 + random.nextInt(200);


  String color = getRandomColor();
  line.setAttribute("stroke", color);
  line.setAttribute("fill", color);
  line.setAttribute("stroke-width", "${1 + random.nextInt(6)}");

  line.setAttribute("points", "$startX,$startY $nextX,$nextY");
  svg.append(line);
}

void drawDoll() async{
  Doll doll = await(Doll.makeRandomDoll());
  int startX = random.nextInt(WIDTH);
  int startY = random.nextInt(HEIGHT);
  CanvasElement canvas = await(doll.getNewCanvas());
  /*canvas.style.position = "absolute";
  canvas.style.top = "$startY";
  canvas.style.right = "$startX";
  canvas.style.zIndex = "1";*/

  output.append(canvas);
}