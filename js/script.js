/*if (confirm('Pour accéder à ce site vous devez avoir 18 ans ou plus, cliquez sur "OK" si c\'est le cas.')) {
    alert('Vous allez être redirigé vers le site.');
}

else {
    alert("Désolé, vous n'avez pas accès à ce site.");
}*/

$(document).ready(function(){
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);


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
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });

    })


