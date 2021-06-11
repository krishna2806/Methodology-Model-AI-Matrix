img = "";
status = "";
obj = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    c = createCanvas(750, 400);
    c.center();
    v=createCapture(VIDEO)
    v.hide();
    v.size(750,400);
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "STATUS:DETECTING OBJECTS";
}

function modelLoaded() {
    console.log("model loaded!");
    status = true;
    
}

function gotreusult(error, result) {
    if (error) {
        console.error(error);
    } 
    
    else {
        console.log(result);
        obj = result;
    }
}

function draw() {
    image(v, 0, 0, 750, 400)

    if (status != "") {
        r=random(255)
        g=random(255)
        b=random(255)
        objectdetector.detect(v, gotreusult);
        for (i = 0; i < obj.length; i++) {
            fill(r,g,b);
            document.getElementById("status").innerHTML = "STATUS:OBJECT DETECTED";
            document.getElementById("object").innerHTML= "no of objetcs are " + obj.length;
            percent = floor(obj[i].confidence * 100);            
            text(obj[i].label + "   " + percent + "%", obj[i].x + 15, obj[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        }
    }



}