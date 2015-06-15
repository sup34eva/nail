//*******************************Pyramide***************************************
BABYLON.Mesh.CreatePyramid4 = function(name, baseSize, height, scene, updatable) {
    var pyramid = new BABYLON.Mesh(name, scene);

    // Adding faces
    var positions = [
        // Front face
        0, height / 2, 0,
        baseSize / 2, -height / 2, baseSize / 2, -baseSize / 2, -height / 2, baseSize / 2,

        // Right face
        0, height / 2, 0,
        baseSize / 2, -height / 2, -baseSize / 2,
        baseSize / 2, -height / 2, baseSize / 2,

        // Back face
        0, height / 2, 0, -baseSize / 2, -height / 2, -baseSize / 2,
        baseSize / 2, -height / 2, -baseSize / 2,

        // Left face
        0, height / 2, 0, -baseSize / 2, -height / 2, baseSize / 2, -baseSize / 2, -height / 2, -baseSize / 2,

        // Bottom face
        -baseSize / 2, -height / 2, baseSize / 2,
        baseSize / 2, -height / 2, baseSize / 2,
        baseSize / 2, -height / 2, -baseSize / 2, -baseSize / 2, -height / 2, -baseSize / 2
    ];

    var normals = [
        height, baseSize / 2, 0,
        height, baseSize / 2, 0,
        height, baseSize / 2, 0,

        0, baseSize / 2, height,
        0, baseSize / 2, height,
        0, baseSize / 2, height,

        -height, baseSize / 2, 0, -height, baseSize / 2, 0, -height, baseSize / 2, 0,

        0, baseSize / 2, -height,
        0, baseSize / 2, -height,
        0, baseSize / 2, -height,

        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0
    ];

    var indices = [];
    var uvs = [];
    var i = 0;
    while (i < 12) {
        indices.push(i + 0);
        uvs.push(1.0, 1.0);
        indices.push(i + 1);
        uvs.push(0.0, 1.0);
        indices.push(i + 2);
        uvs.push(0.0, 0.0);
        i = i + 3;
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
};

BABYLON.Mesh.CreateTrapezoid = function(name, topWidth, botWidth, hight, scene){

    topWidth = topWidth / 2;
    botWidth = botWidth / 2;
    hight = hight / 2;

    var trapezoid = new BABYLON.Mesh(name, scene);

    var indices = [
        0, 1, 2,
        1, 3, 2
    ];

    var positions = [
        //corner bottom left
        -botWidth, -hight, 0,

        //corner bottom right
		botWidth, -hight, 0,

        //corner top left
		-topWidth, hight, 0,

        //corner top right
		topWidth, hight, 0
    ];

    var normals = [
        0, 0, -1,
		0, 0, -1,
		0, 0, -1,
		0, 0, -1
    ];
    var uvs = [
        0, 0, 1, 0, 1, 1, 0, 1
    ];

    trapezoid.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
    trapezoid.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
    trapezoid.setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
    trapezoid.setIndices(indices);

    return trapezoid;

};
