function rnd_snd() {
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3
}

function rnd(mean, stdev) {
    return rnd_snd() * stdev + mean;
}

var random = function () {
    return Math.random() * -2 + 1;
};
function Matrix(width, height, _routeness) {
    defaultValue = 0;
    this._width = width;
    this._height = height;
    this.routeness = _routeness;
    this.scale = 1 / Math.pow(2, _routeness),

    this.data = Array.apply(null, Array(width * height)).map(function() {
        return defaultValue
    });



    this.getData = function() {
        return this.data;
    };

    this.get_amout = function () {
       var sum = 0, count = 0, min = 0, max = 1;
        for (var i = arguments.length - 1; i >= 0; i--) {
            var value = this.get(arguments[i]);
            if (value !== null) {

                sum += value;
                count ++;
                if (value < min) {
                    min = value;
                }
                if (value > max) {
                    max = value;
                }
            }
        }

        return sum / count + this.scale * rnd(min, max);
    };


    this.get = function(point) {
        var x = point[0], y = point[1];
        if (x > this._width || y > this._height) {
            return null;
        }

        return this.data[y * this._height + x];
    };

    this.set = function(point, value) {

        var x = point[0], y = point[1];
        if (x > this._width || y > this._height) {
            return 0;
        }

        this.data[y * this._height + x] = value;
    };

    this.initCorner = function() {
        this.set([0, 0], this.scale * rnd(0, 1));
        this.set([0, this._height], this.scale * rnd(0, 1));
        this.set([this._width, 0], this.scale * rnd(0, 1));
        this.set([this._width, this._height], this.scale * rnd(0, 1));
    };

    this.normalize = function () {
        var max = 0, min = 0;

        for (var i = this.data.length - 1; i >= 0; i--) {
            if (this.data[i] > max) max = this.data[i];
            if (this.data[i] < min) min = this.data[i];
        }
        for (var i = this.data.length - 1; i >= 0; i--) {
            this.data[i] = (this.data[i] - min) / (max - min);
        }
        return this.data;

    };

    this.newPoint = function(t1, t2) {
        console.log("new point:", t1, t2);
    
        // step1 与坐标轴平行的矩形
        // p1---p2---p3
        // |    |    |
        // p4---p5---p6
        // |    |    |
        // p7---p8---p9
        var x1 = t1[0], y1 = t1[1];
        var x2 = t2[0], y2 = t2[1];

      
        if (Math.abs(y2 - y1) <=1 || Math.abs(x2 - x1) <= 1) {
            console.log("iterations ended");
            return;
        }

        var p1, p2, p3, p4, p5, p6, p7, p8, p9;

        p1 = [x1, y1];
        p2 = [(x2 + x1) / 2, y1];
        p3 = [x2, y1];
        
        p4 = [x1, (y2 + y1) / 2];
        p5 = [(x2 + x1) / 2, (y2 + y1) / 2];
        p6 = [x2, (y2 + y1) / 2];

        p7 = [x1, y2];
        p8 = [(x2 + x1) / 2, y2];
        p9 = [x2 , y2];
        
        this.set(p5, this.get_amout(p1, p2, p3, p4)) ;

        this.set(p2, this.get_amout(p1, p3, p5)) ;
        this.set(p4, this.get_amout(p1, p5, p7));
        this.set(p6, this.get_amout(p3, p5, p9));
        this.set(p8, this.get_amout(p5, p7, p9));

        this.newPoint(p1, p5);
        this.newPoint(p3, p5);
        this.newPoint(p7, p5);
        this.newPoint(p9, p5);

       
    };


}


Terrain = function(width, height, iterations) {
    var routeness = 2,
        size = Math.pow(2, iterations),
        n_vertice = size + 1,
        // scale = 1 / Math.pow(2, routeness),
        matrix = new Matrix(n_vertice, n_vertice, routeness);
        

    this.geometry = new THREE.PlaneGeometry(60, 60, size, size);

    var p1, p2, p3, p4;
    var middlePoint, data;

    matrix.initCorner();
    p5 = matrix.newPoint([0, 0], [size, size]);

    this.data = data = matrix.getData();
    console.log("matrix:", data);

    for (var i = this.geometry.vertices.length - 1; i >= 0; i--) {
        if (data[i] > -0.04) {
            this.geometry.vertices[i].z += data[i] * 60;
        }
    }


    this.getGeomerty = function() {
        return this.geometry;
    };

    this.renderHeightMap = function (canvasId) {
        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext('2d');
        matrix.normalize();

        for (var i = 0; i <= size; i++) {
           for (var j = 0; j <= size; j++) {
               var _h = 200 / (size + 1);
               var color = (matrix.get([i, j]) * 255).toFixed(0);
               ctx.fillStyle='rgb(' + color + ',' + color + ',' + color + ')';
               ctx.fillRect( _h * i, _h * j, _h, _h);
           }
        };
    };
}