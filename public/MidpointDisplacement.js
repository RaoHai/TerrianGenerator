var iterationsCount = 0;

function Matrix(width, height, _scale) {
    defaultValue = 0;
    this._width = width;
    this._height = height;
    this.scale = _scale;

    this.data = Array.apply(null, Array(width * height)).map(function() {
        return defaultValue
    });

    this.getData = function() {
        return this.data;
    };

    this.get_amout = function () {
       var sum = 0, count = 0;
        for (var i = arguments.length - 1; i >= 0; i--) {
            var value = this.get(arguments[i]);
            if (value !== null) {
                // console.log("-->get:", arguments[i], value);
                sum += value;
                count ++;
            }
        }
        return sum / count + this.scale * Math.random() * 15;
    };


    this.get = function(point) {
        var x = point[0], y = point[1];
        if (x > this._width || y > this._height) {
            return null;
        }
        // console.log("get:",x , y, y * this._height + x, this.data[y * this._height + x]);
        return this.data[y * this._height + x];
    };

    this.set = function(point, value) {
        // console.log("set:", point, value);
        var x = point[0], y = point[1];
        if (x > this._width || y > this._height) {
            return 0;
        }

        this.data[y * this._height + x] = value;
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
        
        console.log("center:", p5);
        // console.log("avg:",this.get_avg(p1, p3, p7, p9));
        this.set(p5, this.get_amout(p1, p2, p3, p4)) ;

        this.set(p2, this.get_amout(p1, p3, p5));
        this.set(p4, this.get_amout(p1, p5, p7));
        this.set(p6, this.get_amout(p3, p5, p9));
        this.set(p8, this.get_amout(p5, p7, p9));

        this.newPoint(p1, p5);
        this.newPoint(p3, p5);
        this.newPoint(p7, p5);
        this.newPoint(p9, p5);
        // this.newPoint()

        // this.
        //this.newPoint(p5, p7);
       
    };


}


Terrain = function(width, height, iterations) {
    var routeness = 1,
        size = Math.pow(2, iterations),
        n_vertice = size + 1,
        scale = 1 / Math.pow(2, routeness),
        matrix = new Matrix(n_vertice, n_vertice, scale);
        

    this.geometry = new THREE.PlaneGeometry(60, 60, size, size);

    var p1, p2, p3, p4;
    var middlePoint, data;

    //step1
    // p1 = matrix.get(0, 0);
    // p2 = matrix.get(size, 0);
    // p3 = matrix.get(0, size);
    // p4 = matrix.get(size, size);
    // console.log('set:', size / 2);
    // middlePoint = matrix.set(, 3);
    p5 = matrix.newPoint([0, 0], [size, size]);
    // pn = matrix.newPoint([0, 0], p5);
    // matrix.newPoint(p5, pn);

    // // matrix.newPoint(0, size, size, size, scale);
    // // matrix.newPoint(size, 0, size, size, scale);
    // // matrix.newPoint(0, 0, 0, size, scale);
    // // matrix.newPoint(0, 0, size, 0, scale);
    // // matrix.newPoint(size, 0, 0, 0, scale);
    // // matrix.newPoint(0, size, 0, 0, scale);
    // // matrix.newPoint(0, 0, size, 0, scale);
    // // matrix.newPoint(0, 0, 0, size, scale);

    data = matrix.getData();

    for (var i = this.geometry.vertices.length - 1; i >= 0; i--) {
        this.geometry.vertices[i].z += data[i];
        // console.log("data->", data[i]);
    }


    this.getGeomerty = function() {
        return this.geometry;
    };
}