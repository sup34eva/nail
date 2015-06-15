var fpsLabel = document.getElementById("fpsLabel");
var camPosTxt = document.getElementById("camPosTxt");
var currentzone = document.getElementById("currentzone");

var createScene = function() {

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), world.scenes[world.zone_id].scene); //Creation d'une camera
    camera.checkCollisions = true; //La camera peut rentrer en collision avec les objets

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.maxZ = 10000; //Distance de vue max
    camera.attachControl(canvas, true); //Met la camera dans le canvas

    //Lumiere hemispherique
    var hemLlight = new BABYLON.HemisphericLight("hemLlight", new BABYLON.Vector3(0, 1, 0), world.scenes[world.zone_id].scene);
    hemLlight.intensity = 250 / 400;
    hemLlight.diffuse = new BABYLON.Color3(153 / 255, 190 / 255, 221 / 255);

    //Lumiere directionelle
    var dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-0.8, -0.95, 0.9), world.scenes[world.zone_id].scene);
    dirLight.intensity = 1;
    dirLight.diffuse = new BABYLON.Color3(245 / 255, 241 / 255, 214 / 255);

    //Sol avec toutes ses composantes
    var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, world.scenes[world.zone_id].scene);
    ground.renderingGroupId = 1;
    ground.material = new BABYLON.StandardMaterial("gMaterial", world.scenes[world.zone_id].scene);
    ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
    //composante diffuse
    ground.material.diffuseTexture = new BABYLON.Texture("img/ground/diffuse.png", world.scenes[world.zone_id].scene);
    ground.material.diffuseTexture.uScale = 100;
    ground.material.diffuseTexture.vScale = 100;
    //composante ambiante
    ground.material.ambientTexture = new BABYLON.Texture("img/ground/ambient.png", world.scenes[world.zone_id].scene);
    ground.material.ambientTexture.uScale = 100;
    ground.material.ambientTexture.vScale = 100;
    //composante speculaire
    ground.material.specularTexture = new BABYLON.Texture("img/ground/specular.png", world.scenes[world.zone_id].scene);
    ground.material.specularTexture.uScale = 100;
    ground.material.specularTexture.vScale = 100;
    //Normal map
    ground.material.bumpTexture = new BABYLON.Texture("img/ground/normal.png", world.scenes[world.zone_id].scene);
    ground.material.bumpTexture.uScale = 100;
    ground.material.bumpTexture.vScale = 100;

    ground.checkCollisions = true; //On ne peut pas le traverser
    ground.position.y = -5;
    ground.receiveShadows = true; //Recois les ombres

    // Création d'un material
    var sMaterial = new BABYLON.StandardMaterial("skyboxMaterial", world.scenes[world.zone_id].scene);
    sMaterial.backFaceCulling = false;
    sMaterial.reflectionTexture = new BABYLON.CubeTexture("img/skybox/vertigo", world.scenes[world.zone_id].scene);
    sMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    sMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    sMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    // Création d'un cube avec la material adaptée
    var skybox = BABYLON.Mesh.CreateBox("skybox", 500, world.scenes[world.zone_id].scene);
    skybox.material = sMaterial;
    skybox.infiniteDistance = true;

    //creation des murs
    var wallMaterial = new BABYLON.StandardMaterial("gMaterial", world.scenes[world.zone_id].scene);
    wallMaterial.alpha  = 0;
    wallMaterial.specularColor = new BABYLON.Color4(0, 0, 0, 0);

    var wallFace = new BABYLON.Mesh.CreatePlane("wallFace", 1000, world.scenes[world.zone_id].scene);
    wallFace.material = wallMaterial;
    wallFace.position = new BABYLON.Vector3(0, 0, 500);
    wallFace.rotation = new BABYLON.Vector3(0, 0, 0);
    wallFace.checkCollisions = true;
    wallFace.renderingGroupId = 1;

    var wallGauche = new BABYLON.Mesh.CreatePlane("wallGauche", 1000, world.scenes[world.zone_id].scene);
    wallGauche.material = wallMaterial;
    wallGauche.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
    wallGauche.position = new BABYLON.Vector3(-500, 0, 0);
    wallGauche.checkCollisions = true;
    wallGauche.renderingGroupId = 1;

    var wallDroite = new BABYLON.Mesh.CreatePlane("wallDroite", 1000, world.scenes[world.zone_id].scene);
    wallDroite.material = wallMaterial;
    wallDroite.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
    wallDroite.position = new BABYLON.Vector3(500, 0, 0);
    wallDroite.checkCollisions = true;
    wallDroite.renderingGroupId = 1;

    var wallDerriere = new BABYLON.Mesh.CreatePlane("wallDerriere", 1000, world.scenes[world.zone_id].scene);
    wallDerriere.material = wallMaterial;
    wallDerriere.rotation = new BABYLON.Vector3(0, Math.PI, 0);
    wallDerriere.position = new BABYLON.Vector3(0, 0, -500);
    wallDerriere.checkCollisions = true;
    wallDerriere.renderingGroupId = 1;

    var wallDessus = new BABYLON.Mesh.CreatePlane("wallDessus", 1000, world.scenes[world.zone_id].scene);
    wallDessus.material = wallMaterial;
    wallDessus.rotation = new BABYLON.Vector3(3 * Math.PI / 2, 0, 0);
    wallDessus.position = new BABYLON.Vector3(0, 500, 0);
    wallDessus.checkCollisions = true;
    wallDessus.renderingGroupId = 1;


    return world.scenes[world.zone_id].scene; //Retourne la scene
};
//****************Creation et gestion de MESH***********************************
var meshCount = -1; //Compteur de mesh

function Mesh() {
    var type = document.getElementById("mesh-type").value;
    switch (type) { //Suivant la valeur du select creer l'objet
        case "box":
            mesh = BABYLON.Mesh.CreateBox(nom.value, 2, world.scenes[world.zone_id].scene);
            break;

        case "sphere":
            mesh = BABYLON.Mesh.CreateSphere(nom.value, 50, 2, world.scenes[world.zone_id].scene);
            break;

        case "cylinder":
            mesh = BABYLON.Mesh.CreateCylinder(nom.value, 2, 2, 2, 50, 1, world.scenes[world.zone_id].scene, false);
            break;

        case "pyramid":
            mesh = BABYLON.Mesh.CreatePyramid4(nom.value, 2, 2, world.scenes[world.zone_id].scene, false);
            break;

        case "line":
            mesh = BABYLON.Mesh.CreateLines(nom.value, [
                new BABYLON.Vector3(-1, 0, 0),
                new BABYLON.Vector3(1, 0, 0),
            ], world.scenes[world.zone_id].scene);
            break;

        case "plane":
            mesh = BABYLON.Mesh.CreatePlane(nom.value, 1, world.scenes[world.zone_id].scene);
            mesh.scaling.x = 2;
            break;

        case "circle":
            mesh = new BABYLON.Mesh.CreateDisc(nom.value, 2, 50, world.scenes[world.zone_id].scene);
            break;

        case "trapezoid":
            mesh = new BABYLON.Mesh.CreateTrapezoid(nom.value, 1, 2, 1, world.scenes[world.zone_id].scene);
            break;

        default:
            alert("Ce type d'objet n'existe pas");
            break;
    }

    mesh.type = type;
    mesh.linker = -1;
    mesh.renderingGroupId = 1;

    var colorMat = new BABYLON.StandardMaterial("color", world.scenes[world.zone_id].scene);
    colorMat.diffuseColor = new BABYLON.Color3(R / 255, G / 255, B / 255);
    colorMat.backFaceCulling = false;
    mesh.material = colorMat;
    return (mesh);
}



//*********Convertisseur hexa en RGB****************************************
var picker = document.getElementById('color'),
    c, R = 229.5,
    G = 229.5,
    B = 229.5;

function hexToR(h) {
    return parseInt(h.substring(0, 2), 16)
}

function hexToG(h) {
    return parseInt(h.substring(2, 4), 16)
}

function hexToB(h) {
    return parseInt(h.substring(4, 6), 16)
}

function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}
picker.onchange = function() {
    c = cutHex(this.value);

    R = hexToR(c);
    G = hexToG(c);
    B = hexToB(c);

    world.scenes[world.zone_id].meshTab[index].material.diffuseColor.r = R / 255;
    world.scenes[world.zone_id].meshTab[index].material.diffuseColor.g = G / 255;
    world.scenes[world.zone_id].meshTab[index].material.diffuseColor.b = B / 255;
};

//*********retourne les valeurs pour index du tableau***********************

var index = 0;

function indexation(x) { //En fonction du bouton cliqué donne l'index du tableau
    $(".grp").css("display", "none"); //Cache les boutons pour les groupes
    $(".ungrp").css("display", "block"); //Montre les objets pour les boutons simples
    index = x; //Change l'index courant avec l'index du bouton clique
    positionx.value = world.scenes[world.zone_id].meshTab[index].position.x; // Change les valeurs des inputs avec celui de l'objet selectioné
    positiony.value = world.scenes[world.zone_id].meshTab[index].position.y;
    positionz.value = world.scenes[world.zone_id].meshTab[index].position.z;
    nom.value = world.scenes[world.zone_id].meshTab[index].name;
    taillex.value = world.scenes[world.zone_id].meshTab[index].scaling.x;
    tailley.value = world.scenes[world.zone_id].meshTab[index].scaling.y;
    taillez.value = world.scenes[world.zone_id].meshTab[index].scaling.z;
    rotx.value = world.scenes[world.zone_id].meshTab[index].rotation.x * 100;
    roty.value = world.scenes[world.zone_id].meshTab[index].rotation.y * 100;
    rotz.value = world.scenes[world.zone_id].meshTab[index].rotation.z * 100;
    picker.value = "#" + Math.round(world.scenes[world.zone_id].meshTab[index].material.diffuseColor.r * 255).toString(16) + Math.round(world.scenes[world.zone_id].meshTab[index].material.diffuseColor.g * 255).toString(16) + Math.round(world.scenes[world.zone_id].meshTab[index].material.diffuseColor.b * 255).toString(16);
};

//*********Groups****************************************

var btn_grp = document.getElementById('btn_grp');
var grp_count = 0;
btn_grp.onclick = function() { //Fonction groupe
    btn_ok.style.display = "block";//Affiche le bouton ok
    Array.prototype.slice.call(document.getElementById("objets").querySelectorAll("[type=radio]")).forEach(function(e) {
        e.type = "checkbox";//Change tous les radio en checkbox
    });
};

//var index_grp = 0;
function grp_index(x) {
    $(".grp").css("display", "block"); //Cache les boutons pour les objets seuls
    $(".ungrp").css("display", "none"); //Montre les boutons pour les objets de groupe
    index = x; //Change l'index courant avec celui du bouton de groupe
    grp_nom.value = document.querySelector('[data-grp="'+ index +'"]').getAttribute("name"); //Met la valeur du nom du groupe dans l'input
}

var nom = document.getElementById('name');
nom.oninput = function() { //Fonction pour changer de nom d'objet seuls
    document.querySelector('[data-mesh="'+ index +'"]').innerHTML = '<input type="radio">' + nom.value;
    world.scenes[world.zone_id].meshTab[index].name = nom.value;
};

var grp_nom = document.getElementById('grp_name');
grp_nom.oninput = function() { //Fonction pour changer le nom d'un groupe
    document.querySelector('[data-grp="'+ index +'"]').setAttribute("name", grp_nom.value);
    document.querySelector('[data-grp="'+ index +'"]').innerHTML = '<input type="radio">' + grp_nom.value;
    world.scenes[world.zone_id].grp_tab[index].name = grp_nom.value;
};

//***********Fin groupes************************************


world.scenes[world.zone_id].scene = createScene(); //Cree la scene

engine.runRenderLoop(function() { //A chaque frame
  world.scenes[world.zone_id].scene.render();
    fpsLabel.innerHTML = engine.getFps().toFixed() + " fps"; //Montre le fps
    //Montre la position de la camera
    camPosTxt.innerHTML = 'Position de la caméra X:' + world.scenes[world.zone_id].scene.activeCamera.position.x.toFixed(2) + '&nbsp Y:' + world.scenes[world.zone_id].scene.activeCamera.position.y.toFixed(2) + "&nbsp Z:" + world.scenes[world.zone_id].scene.activeCamera.position.z.toFixed(2);
});

//On Resize
window.addEventListener("resize", function() { //Redimentioner la le canvas si la fenetre se redimentionne
    engine.resize();
});

//***********************************Save***************************************
var save = document.getElementById("saveLink");
save.onclick = function(e) {

        var fileWorld = world;

        fileWorld.scenes.forEach(function(e) {

            e.meshTab = e.meshTab.map(function(mesh) {
                return {
                    type: mesh.type,
                    position: mesh.position,
                    scaling: mesh.scaling,
                    diffuseColor: mesh.material.diffuseColor,
                    name: mesh.name
                };
            });

            //suppression de la scene
            delete e.scene;
        });

        console.log(fileWorld);

        var textToWrite = JSON.stringify(fileWorld);

        var textFileAsBlob = new File([textToWrite], "world.nail", {
            type: 'application/octet-stream'
        });

        save.href = window.URL.createObjectURL(textFileAsBlob);
    }

//***************************Load***********************************************
var loadInput = document.getElementById("load");
loadInput.onchange = function() {
        var file = loadInput.files[0];

        var fr = new FileReader();
        fr.onloadend = function() {
            fileWorld = JSON.parse(fr.result);
            console.log(fileWorld);

            //supprime tous les meshs du canvas
            world.scenes[world.zone_id].meshTab.forEach(function(mesh) {
                mesh.dispose();
            });
            world.scenes[world.zone_id].meshTab = [];
            world.zone_id = 0;
            //supprime les boutons
            $("#objets").empty();
            $("#zones").empty();


            var sceneCount = 0;
            fileWorld.scenes.forEach(function(forScenes){
                world.scenes[sceneCount] = {
                    "scene" : createScene(),
                    "meshTab" : [],
                    "grp_tab" : []
                };

                var meshCount = 0;
                forScenes.meshTab.forEach(function(forMeshTab){

                    if(forMeshTab != null)
                    {
                        switch (forMeshTab.type) {
                            case "box":
                                world.scenes[sceneCount].meshTab[meshCount] = BABYLON.Mesh.CreateBox(forMeshTab.name, 2, world.scenes[sceneCount].scene);
                                break;

                            case "sphere":
                                world.scenes[sceneCount].meshTab[meshCount] = BABYLON.Mesh.CreateSphere(forMeshTab.name, 50, 2, world.scenes[sceneCount].scene);
                                break;

                            case "cylinder":
                                world.scenes[sceneCount].meshTab[meshCount] = BABYLON.Mesh.CreateCylinder(forMeshTab.name, 2, 2, 2, 50, 1, world.scenes[sceneCount].scene, false);
                                break;

                            case "pyramid":
                                world.scenes[sceneCount].meshTab[meshCount] = BABYLON.Mesh.CreatePyramid4(forMeshTab.name, 2, 2, world.scenes[sceneCount].scene, false);
                                break;

                            case "line":
                                world.scenes[sceneCount].meshTab[meshCount] = BABYLON.Mesh.CreateLines(forMeshTab.name, [
                                    new BABYLON.Vector3(-1, 0, 0),
                                    new BABYLON.Vector3(1, 0, 0),
                                ], world.scenes[sceneCount].scene);
                                break;

                            case "plane":
                                world.scenes[sceneCount].meshTab[meshCount] = BABYLON.Mesh.CreatePlane(forMeshTab.name, 1, world.scenes[sceneCount].scene);
                                mesh.scaling.x = 2;
                                break;

                            case "circle":
                                world.scenes[sceneCount].meshTab[meshCount] = new BABYLON.Mesh.CreateDisc(forMeshTab.name, 2, 50, world.scenes[sceneCount].scene);
                                break;

                            case "trapezoid":
                                world.scenes[sceneCount].meshTab[meshCount] = new BABYLON.Mesh.CreateTrapezoid(forMeshTab.name, 1, 2, 1, 50, world.scenes[sceneCount].scene);
                                break;
                        }


                        world.scenes[sceneCount].meshTab[meshCount].position = forMeshTab.position;
                        world.scenes[sceneCount].meshTab[meshCount].scaling = forMeshTab.scaling;
                        world.scenes[sceneCount].meshTab[meshCount].renderingGroupId = 1;

                        //gestion du material
                        world.scenes[sceneCount].meshTab[meshCount].material = new BABYLON.StandardMaterial("color", world.scenes[sceneCount].scene);
                        world.scenes[sceneCount].meshTab[meshCount].material.diffuseColor = forMeshTab.diffuseColor;

                        //ajout du bouton dans l'interface
                        var button = document.createElement("label"); // Cree un bouton
                        button.innerHTML = '<input type="radio">' + forMeshTab.name; // Met un titre au bouton
                        button.dataset.mesh = meshCount;
                        button.onclick = function(e){
                            indexation(this.dataset.mesh)
                        };
                        ["btn", "btn-success", "nav-justified"].forEach(function(e) {
                            button.classList.add(e)
                        }); // Ajoute des class
                        document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page
                    }

                    meshCount++;
                });

                world.scenes[sceneCount].grp_tab = forScenes.grp_tab;

                var grpCount = 0;
                world.scenes[sceneCount].grp_tab.forEach(function(e) {
                    //ajout du bouton de groupe
                    var button = document.createElement("label"); // Cree un bouton
                    button.innerHTML = '<input type="radio">' + e.name; // Met un titre au bouton
                    button.dataset.grp = grp_count;
                    button.onclick = function(e){
                        grp_index(this.dataset.grp);
                    };
                    ["btn", "btn-violet", "nav-justified"].forEach(function(e) {
                        button.classList.add(e)
                    }); // Ajoute des class
                    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page

                    grpCount++;
                });

                //ajout du bouton de zone
                var button = document.createElement("label"); // Cree un bouton
                button.innerHTML = '<input type="radio">' + 'zone ' + sceneCount; // Met un titre au bouton
                button.dataset.zone = sceneCount;
                button.onclick = function(e){
                    zoneCharge(this.dataset.zone);
                };
                ["btn", "btn-success", "nav-justified"].forEach(function(e) {
                    button.classList.add(e)
                }); // Ajoute des class
                document.getElementById("zones").appendChild(button); // Ajoute le bouton dans la page
                //currentzone.innerHTML = 'Zone : ' + sceneCount;


                sceneCount ++;
            });

        }
        fr.readAsText(file);
        console.log(world);
    }
    //********************************Fin Load**************************************
