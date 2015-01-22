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
}

void GLclass::paintGL()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

}

void GLclass::resizeGL(int width, int height)
{

}
