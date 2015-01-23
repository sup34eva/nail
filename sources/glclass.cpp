#include <glclass.h>
#include <QOpenGLShaderProgram>
#include <QOpenGLShader>
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
    glClearColor(0.0, 0.0, 0.0, 0.0);
}

void GLclass::paintGL()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    //shaders test
    QOpenGLShaderProgram program(this);

    //ad shaders to program
    program.addShaderFromSourceFile(QOpenGLShader::Vertex, ":/shader/shaders/vertex.vert");
    program.addShaderFromSourceFile(QOpenGLShader::Fragment, ":/shader/shaders/fragment.frag");
    program.link();
    program.bind();

    int vertexLocation = program.attributeLocation("vertex");
    int matrixLocation = program.uniformLocation("matrix");
    int colorLocation = program.uniformLocation("color");

    static GLfloat const triangleVertices[] = {
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

    program.enableAttributeArray(vertexLocation);
    program.setAttributeArray(vertexLocation, triangleVertices, 3);
    program.setUniformValue(matrixLocation, pmvMatrix);
    program.setUniformValue(colorLocation, color);

    glDrawArrays(GL_TRIANGLES, 0, 3);

    program.disableAttributeArray(vertexLocation);
}

void GLclass::resizeGL(int width, int height)
{

}
