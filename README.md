![](/public/images/terrian.png)

在游戏开发中，有时需要生成随机的地形。生成随机地形通常有：

* Midpoint Displacement
* Fractal
* Diamond-square
* Perlin Noise

等方法。

### Midpoint Displacement ###
Midpoint Displacement（中点偏移，暂译）算法的思路非常简单：对于一条直线，取其中点，然后对该点进行一个随机大小的位移。重复此步骤，直到迭代结束。

对于一个平面来说，使用中点偏移方法生成地形的方法如下：

1)  把一个矩形平均分为2 * 2的小网格。
2)  把新得到的5个顶点在y轴上赋予一个随机数δ。
3)  对每一个小网格重复以上步骤。直到迭代结束。
![](/public/images/midpoint-1.png)

在程序中，通常可以这么做。下图1-4展现的是第一次迭代。2-5展现的是第二次迭代：
![](/public/images/step.png)

随着迭代次数的增加，地形将以下面的形式变化：
![](/public/images/terrian.png)


但是，如果直接使用上面描述来生成地形，由于在每次迭代的过程中，顶点v在y轴上赋予y轴的随机数δ都是完全随机的。通常会出现地形过于陡峭的情况。如下图，生成的平面出现锯齿。
![](/public/images/juchi-1.png)

对于这种情况，可以在每次迭代中，或者根据该顶点附近的其他顶点的y值的平均值来求这个随机值δ(2)。

![](/public/images/gram1-2.png)

其中：avg为点v临近点的平均y值。scale <span style="mso-bidi-font-size:16.0pt;mso-ansi-language:EN-US"> = 1/2<sup>H</sup><o:p></o:p></span>， H为陡峭程度（1 <= H <= 2）.

另有：

![](/public/images/gram2.png)
其中，μ等于该点v的临近点的最小y值，σ<sup>2</sup> 为改点v的临近点的最大y值。
经过这样修正，生成的随机地形更加自然了一些。
![](/public/images/terr2.png)
再把一定高度以下的点位设为0（水平面），得出的地形已经算是可以接受了。
![](/public/images/terr3.png)


### 实现 ###
这里用WebGL(three.js)实现了一个非常简单的demo。













