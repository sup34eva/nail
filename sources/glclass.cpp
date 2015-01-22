#include <glclass.h>
#include <GL/glu.h>
#include <string>

GLclass::GLclass(QObject* parent)
{
}

GLclass::~GLclass()
{

}

void GLclass::initializeGL()
{
    initializeOpenGLFunctions();//sinon runtime error
    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LESS);
    glEnable(GL_CULL_FACE);

    static const GLfloat g_vertex_buffer_data[] = {
       -1.0f, -1.0f, 0.0f,
       1.0f, -1.0f, 0.0f,
       0.0f,  1.0f, 0.0f,
    };

    /*glGenVertexArrays(1, &VertexArrayID);
    glBindVertexArray(VertexArrayID);*/

    glGenBuffers(1, &vertexbuffer);
    glBindBuffer(GL_ARRAY_BUFFER, vertexbuffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(g_vertex_buffer_data), g_vertex_buffer_data, GL_STATIC_DRAW);
}

void GLclass::paintGL()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    // premier tampon d'attributs : les sommets
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, vertexbuffer);
    glVertexAttribPointer(
       0,                  // attribut 0. Aucune raison particulière pour 0, mais cela doit correspondre au « layout » dans le shader
       3,                  // taille
       GL_FLOAT,           // type
       GL_FALSE,           // normalisé ?
       0,                  // nombre d'octets séparant deux sommets dans le tampon
       (void*)0            // décalage du tableau de tampon
    );

    // Dessine le triangle !
    glDrawArrays(GL_TRIANGLES, 0, 3); // Démarre à partir du sommet 0; 3 sommets au total -> 1 triangle

    glDisableVertexAttribArray(0);
}

void GLclass::resizeGL(int width, int height)
{

}
