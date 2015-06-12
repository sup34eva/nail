//*********************Full Screen**********************************************
var fullscreen = document.getElementById("fullscreenButton");

fullscreen.onclick = function() {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    }
    //*********************Ajout objet**********************************************
var btn_add = document.getElementById('btn_add');
btn_add.onclick = function() {
    meshCount++; //index tu tableau d'objets
    index = meshCount;

    meshTab[meshCount] = new Mesh(); //Instanciation d'un objet

    var button = document.createElement("label"); // Cree un bouton
    button.innerHTML = '<input type="radio">' + document.getElementById('name').value; // Met un titre au bouton
    button.setAttribute("id", meshCount); // L'id sera l'index du tableau
    button.setAttribute("onClick", "indexation(parseInt(this.id))"); // Donne la function qui gere quel bouton est cliqué
    ["btn", "btn-success", "nav-justified"].forEach(function(e) {
        button.classList.add(e)
    }); // Ajoute des class
    document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page

    positionx.value = 1;
    positiony.value = 1;
    positionz.value = 1;
    taillex.value = 0;
    tailley.value = 0;
    taillez.value = 0;
    rotx.value = 0.0;
    roty.value = 0.0;
    rotz.value = 0.0;
    picker.value = "#FFFFFF";
};
//*********************Suppr objet**********************************************
var btn_sup = document.getElementById('btn_sup');
btn_sup.onclick = function() {
    if (index >= 0) //si objet seul
    {
        if (meshTab[index]) {
            meshTab[index].dispose(); //Supprime l'élement dans le canvas
            document.getElementById(index).remove(); //Supprime le boutton
            meshTab.splice(index, 1); //Supprime la case du tableau
            var nodes = document.getElementById("objets").childNodes;
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i].id > index) //Pour chaque élément ayant un id > a celui supprimer
                {
                    nodes[i].setAttribute("id", nodes[i].id - 1); // Leur id décremente de 1
                }
            }
        }
        meshCount--;
    } else //si objet groupé
    {
        document.getElementById(index).remove(); //Supprime le boutton
        grp_tab.splice(index, 1);
        var nodes = document.getElementById("objets").childNodes;
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].id < index) { //Pour chaque élément ayant un id < a celui supprimer
                nodes[i].setAttribute("id", parseFloat(nodes[i].id) + 1); // Leur id décremente de 1
            }
        }

        grp_count++;
    }
};
//*********************Ajout groupe*********************************************
var btn_ok = document.getElementById('btn_ok_grp');
btn_ok.onclick = function() { //Fonction groupe

    if (document.getElementById("objets").querySelectorAll(":checked").length > 1) {
        btn_ok.style.display = "none";
        grp_tab.push({
            name: "Groupe",
            objects: Array.prototype.slice.call(document.getElementById("objets").querySelectorAll(":checked")).map(function(e) {
                return e.parentNode.id;
            })
        });
        var button = document.createElement("label"); // Cree un bouton
        button.innerHTML = '<input type="radio">' + "Groupe"; // Met un titre au bouton
        button.setAttribute("id", grp_count); // L'id sera l'index du tableau
        button.setAttribute("name", "Groupe");
        button.setAttribute("onClick", "grp_index(parseInt(this.id))"); // Donne la function qui gere quel bouton est cliqué
        ["btn", "btn-violet", "nav-justified"].forEach(function(e) {
            button.classList.add(e)
        }); // Ajoute des class
        document.getElementById("objets").appendChild(button); // Ajoute le bouton dans la page
        grp_count--;
        Array.prototype.slice.call(document.getElementById("objets").querySelectorAll("[type=checkbox]")).forEach(function(e) {
            e.type = "radio";
            e.checked = false;
        });
    } else {
        alert("Selectionnez au moins 2 objets.");
        btn_ok.style.display = "none";
    }
};
//*********************Modif groupe*********************************************
var grp_posxp = document.getElementById('btnplusx');
grp_posxp.onclick = function() //x plus
    {
        grp_tab[Math.abs(index) - 1].objects.forEach(function(element, index) {
            meshTab[element].position.x++;
        })
    };

var grp_posxm = document.getElementById('btnmoinsx');
grp_posxm.onclick = function() //x moins
    {
        grp_tab[Math.abs(index) - 1].objects.forEach(function(element, index) {
            meshTab[element].position.x--;
        })
    };

var grp_posyp = document.getElementById('btnplusy');
grp_posyp.onclick = function() //y plus
    {
        grp_tab[Math.abs(index) - 1].objects.forEach(function(element, index) {
            meshTab[element].position.y++;
        })
    };

var grp_posym = document.getElementById('btnmoinsy');
grp_posym.onclick = function() //y moins
    {
        grp_tab[Math.abs(index) - 1].objects.forEach(function(element, index) {
            meshTab[element].position.y--;
        })
    };

var grp_poszp = document.getElementById('btnplusz');
grp_poszp.onclick = function() //z plus
    {
        grp_tab[Math.abs(index) - 1].objects.forEach(function(element, index) {
            meshTab[element].position.z++;
        })
    };

var grp_poszm = document.getElementById('btnmoinsz');
grp_poszm.onclick = function() //z moins
    {
        grp_tab[Math.abs(index) - 1].objects.forEach(function(element, index) {
            meshTab[element].position.z--;
        })
    };

var check = document.getElementById('check');
check.onclick = function() {
    if ($(".hiden").css("display") == "none") {
        $(".hiden").css("display", "block");
    } else {
        $(".hiden").css("display", "none");
    }
};
//******************Agrandissement synchro**************************************
var taillex = document.getElementById('taillex');
taillex.onchange = function() {
    meshTab[index].scaling.x = taillex.value;
    if (check.checked) {
        meshTab[index].scaling.y = taillex.value;
        meshTab[index].scaling.z = taillex.value;
    }
};
//*********************Modif meshs**********************************************
var tailley = document.getElementById('tailley');
tailley.onchange = function() {
    meshTab[index].scaling.y = tailley.value;
};

var taillez = document.getElementById('taillez');
taillez.onchange = function() {
    meshTab[index].scaling.z = taillez.value;
};

var rotx = document.getElementById('rotx');
rotx.onchange = function() {
    meshTab[index].rotation.x = rotx.value / 100;
};

var roty = document.getElementById('roty');
roty.onchange = function() {
    meshTab[index].rotation.y = roty.value / 100;
};

var rotz = document.getElementById('rotz');
rotz.onchange = function() {
    meshTab[index].rotation.z = rotz.value / 100;
};

var positiony = document.getElementById('posy');
positiony.onchange = function() {
    meshTab[index].position.y = positiony.value;
};

var positionx = document.getElementById('posx');
positionx.onchange = function() {
    meshTab[index].position.x = positionx.value;
};

var positionz = document.getElementById('posz');
positionz.onchange = function() {
    meshTab[index].position.z = positionz.value;
};