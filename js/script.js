/*if (confirm('Pour accéder à ce site vous devez avoir 18 ans ou plus, cliquez sur "OK" si c\'est le cas.')) {
    alert('Vous allez être redirigé vers le site.');
}

else {
    alert("Désolé, vous n'avez pas accès à ce site.");
}*/

$(document).ready(function(){
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var fpsLabel = document.getElementById("fpsLabel");

        var createScene = function () {
        
            // This creates a basic Babylon Scene object (non-mesh)
            var scene = new BABYLON.Scene(engine);
            scene.collisionsEnabled = true;

            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
            camera.keysUp = [90]; // Touche Z
            camera.keysDown = [83]; // Touche S
            camera.keysLeft = [81]; // Touche Q
            camera.keysRight = [68]; // Touche D;
            camera.checkCollisions = true;


            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
        
            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
        
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new BABYLON.PointLight("DirLight", new BABYLON.Vector3(100, 100 , 100), scene);
            light.diffuse = new BABYLON.Color3(1, 1, 1);
            light.specular = new BABYLON.Color3(0.6, 0.6, 0.6);
            light.intensity = 1.5;
        
            // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
            var ground = BABYLON.Mesh.CreateGround("ground1", 250, 250, 2, scene);
            ground.material = new BABYLON.StandardMaterial("gMaterial", scene);
            ground.material.diffuseTexture = new BABYLON.Texture("img/ground.jpg", scene);
            ground.checkCollisions = true;

            // Création d'une material
            var sMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene);
            sMaterial.backFaceCulling = false;
            sMaterial.reflectionTexture = new BABYLON.CubeTexture("img/bluesky", scene);
            sMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;


            // Création d'un cube avec la material adaptée
            var skybox = BABYLON.Mesh.CreateBox("skybox", 250, scene);
            skybox.material = sMaterial;



            return scene;
        
        };

//*****************************Creation et gestion de SPHERE*******************************************
        function Sphere(){
            this.nom = document.getElementById('name').value;
            this.sphere = BABYLON.Mesh.CreateSphere(this.nom, 32, 1, scene);
        }

        var btn_sphere = document.getElementById('sphere');
        
        btn_sphere.onclick = function() {
            s = new Sphere();
            };

        var positiony = document.getElementById('posy');

        positiony.onchange = function() {
            s.sphere.position.y = positiony.value;
            };

        var positionx = document.getElementById('posx');

        positionx.onchange = function() {
            s.sphere.position.x = positionx.value;
            };

        var positionz = document.getElementById('posz');

        positionz.onchange = function() {
            s.sphere.position.z = positionz.value;
            };

        var taillex = document.getElementById('taillex');

        taillex.onchange = function() {
            s.sphere.scaling.x = taillex.value;
            };

        var tailley = document.getElementById('tailley');

        tailley.onchange = function() {
            s.sphere.scaling.y = tailley.value;
            };

        var taillez = document.getElementById('taillez');

        taillez.onchange = function() {
            s.sphere.scaling.z = taillez.value;
            };

        var name = document.getElementById('name');

        name.onchange = function() {
            s.sphere.name = name.value;
            };

//*****************************Fin Creation et gestion de SPHERE*******************************************

        var scene = createScene();

        engine.runRenderLoop(function () {
            scene.render();
            fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });

    })

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
