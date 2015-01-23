#include <glclass.h>
#include <QOpenGLShaderProgram>
#include <QOpenGLShader>
#include <string>

GLclass::GLclass(QWidget* parent) : QOpenGLWidget (parent), m_program(this)
{

}

GLclass::~GLclass()
{

}

void GLclass::initializeGL()
{
    initializeOpenGLFunctions();//sinon runtime error
    //ad shaders to program
    m_program.addShaderFromSourceFile(QOpenGLShader::Vertex, ":/shader/shaders/vertex.vert");
    m_program.addShaderFromSourceFile(QOpenGLShader::Fragment, ":/shader/shaders/fragment.frag");
    m_program.link();
    m_program.bind();

    int colorLocation = m_program.uniformLocation("color");
    int vertexLocation = m_program.attributeLocation("vertex");

    triangleVertices = {
        0.0f, 0.5f, 0.0f,
        -0.5f,-0.5f, 0.0f,
        0.5f,-0.5f, 0.0f
    };

    //couleurs RVBA
    QColor white(255,  255,  255,  255);
    QColor red(255,  0,  0,  255);
    QColor green(0,  255,  0,  255);
    QColor blue(0,  0,  255,  255);
    QColor black(0,  0,  0,  255);

    QColor color = green;
    //QColor color(0, 255, 0, 255);

    QMatrix4x4 pmvMatrix;
    //pmvMatrix.ortho(rect());

    m_program.enableAttributeArray(vertexLocation);
    m_program.setUniformValue("matrix", pmvMatrix);
    m_program.setUniformValue("color", color);
    m_program.setAttributeArray(vertexLocation, &triangleVertices[0], 3);
    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LESS);
    glEnable(GL_CULL_FACE);
    glClearColor(0.0, 0.0, 0.0, 0.0);
}

void GLclass::paintGL()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glDrawArrays(GL_TRIANGLES, 0, 3);
}

/*void GLclass::resizeGL(int width, int height)
{

}*/
