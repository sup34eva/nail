$(document).ready(function(){
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var fpsLabel = document.getElementById("fpsLabel");
    
        CreateLine = function (name, width, scene) {
            var line = BABYLON.Mesh.CreateLines(name, [
                new BABYLON.Vector3(-(width), 0, 0),
                new BABYLON.Vector3(width, 0, 0)
            ], scene);
            
            return line;
        }
    
        BABYLON.Mesh.CreatePyramid4 = function (name, baseSize, height, scene, updatable) {
          var pyramid = new BABYLON.Mesh(name, scene);

          // Adding faces
          var positions = [
            // Front face
            0,  height/2,  0,
            baseSize/2, -height/2, baseSize/2,
            -baseSize/2, -height/2, baseSize/2,

            // Right face
            0, height/2, 0,
            baseSize/2, -height/2, -baseSize/2,
            baseSize/2, -height/2, baseSize/2,

            // Back face
            0, height/2,  0,
            -baseSize/2, -height/2, -baseSize/2,
            baseSize/2, -height/2, -baseSize/2,

            // Left face
            0, height/2,  0,
            -baseSize/2, -height/2, baseSize/2,
            -baseSize/2, -height/2, -baseSize/2,

            // Bottom face
            -baseSize/2, -height/2, baseSize/2,
            baseSize/2, -height/2, baseSize/2,
            baseSize/2, -height/2, -baseSize/2,
            -baseSize/2, -height/2, -baseSize/2
          ];

          var normals = [
            height, baseSize/2, 0,
            height, baseSize/2, 0,
            height, baseSize/2, 0,

            0, baseSize/2, height,
            0, baseSize/2, height,
            0, baseSize/2, height,

            -height, baseSize/2, 0,
            -height, baseSize/2, 0,
            -height, baseSize/2, 0,

            0, baseSize/2, -height,
            0, baseSize/2, -height,
            0, baseSize/2, -height,

            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
          ];

          var indices = [];
          var uvs = [];
          var i = 0;
          while (i < 12) {
            indices.push(i+0);
            uvs.push(1.0, 1.0);
            indices.push(i+1);
            uvs.push(0.0, 1.0);
            indices.push(i+2);
            uvs.push(0.0, 0.0);
            i = i+3;
          }

          indices.push(12);
          indices.push(13);
          indices.push(14);

          indices.push(12);
          indices.push(14);
          indices.push(15);

          uvs.push(1.0, 1.0);
          uvs.push(0.0, 1.0);
          uvs.push(0.0, 0.0);
          uvs.push(1.0, 0.0);

          pyramid.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, updatable);
          pyramid.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals, updatable);
          pyramid.setVerticesData(BABYLON.VertexBuffer.UVKind, uvs, updatable);
          pyramid.setIndices(indices);

          return pyramid;
        }

        engine.runRenderLoop(function () {
            scene.render();
            fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    
        var createScene = function () {
            var scene = new BABYLON.Scene(engine);

            // Setup a simple environment
            var light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 10, 20), scene);
            
            var cube = BABYLON.Mesh.CreateBox("cube", 1.0, scene);
            var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 1.0, scene);
            var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 1, 1, 1, 40, 1.0, scene, false);
            var pyramid = BABYLON.Mesh.CreatePyramid4("pyramid", 1, 1, scene, false);
            var line = BABYLON.Mesh.CreateLines(name, [
                new BABYLON.Vector3(-4, 0, 0),
                new BABYLON.Vector3(2, 0, 0)
            ], scene);
            cube.position.x = -4;
            sphere.position.x = -2;
            //cylinder.position.x = 0;
            pyramid.position.x = 2;

            // ArcRotateCamera >> Camera rotating around a 3D point (here Vector zero)
            // Parameters : name, alpha, beta, radius, target, scene
            var arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
            arcCamera.setPosition(new BABYLON.Vector3(0, 0, 50));
            arcCamera.target = new BABYLON.Vector3(3, 0, 0);

            // FreeCamera >> You can move around the world with mouse and keyboard (LEFT/RIGHT/UP/DOWN)
            // Parameters : name, position, scene
            var freeCamera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 5), scene);
            freeCamera.rotation = new BABYLON.Vector3(0, Math.PI, 0);

            // TouchCamera >> Move in your world with your touch screen (or with your mouse, by drag/drop)
            // Parameters : name, position, scene
            var touchCamera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, 0, 10), scene);
            touchCamera.rotation = new BABYLON.Vector3(0, Math.PI, 0);

            //Attach a camera to the scene and the canvas
            scene.activeCamera = freeCamera;
            freeCamera.attachControl(canvas, true);

            return scene;
        };
    
        var scene = createScene();
})