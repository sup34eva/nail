#include <glclass.h>
#include <QOpenGLShaderProgram>
#include <QOpenGLShader>
#include <QOpenGLBuffer>
#include <string>

QOpenGLBuffer* GLclass::vertex_buffer = nullptr;
QOpenGLBuffer* GLclass::indice_buffer = nullptr;

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

    vertices = {
        -0.5, -0.5, 0, // bottom left corner
        -0.5,  0.5, 0, // top left corner
        0.5,  0.5, 0,  // top right corner
        0.5, -0.5, 0   // bottom right corner
    };

    indices = {
        2,1,0, // first triangle (bottom left - top left - top right)
        3,2,0  // second triangle (bottom left - top right - bottom right)
    };

    vertex_buffer = new QOpenGLBuffer(QOpenGLBuffer::VertexBuffer);
    vertex_buffer->create();
    vertex_buffer->setUsagePattern(QOpenGLBuffer::StaticDraw);
    if (!vertex_buffer->bind())
        return; vertex_buffer->allocate(&vertices[0], vertices.size() * sizeof(GLfloat));

    indice_buffer = new QOpenGLBuffer(QOpenGLBuffer::IndexBuffer); // Ou
    indice_buffer->create();
    indice_buffer->setUsagePattern(QOpenGLBuffer::StaticDraw);
    if (!indice_buffer->bind())
        return; indice_buffer->allocate(&indices[0], indices.size() * sizeof(quint32));

    //couleurs RVBA
    QColor white(255,  255,  255,  255);
    QColor red(255,  0,  0,  255);
    QColor green(0,  255,  0,  255);
    QColor blue(0,  0,  255,  255);
    QColor black(0,  0,  0,  255);

    QColor color = green;

    QMatrix4x4 pmvMatrix;
    //pmvMatrix.ortho(rect());

    m_program.setUniformValue("matrix", pmvMatrix);
    m_program.setUniformValue(colorLocation, color);

    vertex_buffer->bind();
    m_program.setAttributeBuffer(vertexLocation, GL_FLOAT, 0, 3);
    m_program.enableAttributeArray(vertexLocation);

    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LESS);
    glEnable(GL_CULL_FACE);
    glClearColor(0.0, 0.0, 0.0, 0.0);
}

void GLclass::paintGL()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    //Matrice de vue
    QVector3D cam(3, 3, 3);
    QVector3D cible(0, 0, 0);
    QVector3D vert(0, 0, 1);
    view.setToIdentity();
    view.lookAt(cam, cible, vert);

    m_program.bind();
    glDrawElements(GL_TRIANGLES, 2 * 3, GL_UNSIGNED_INT, 0);
    m_program.release();
}

void GLclass::resizeGL(float width, float height)
{
    //Matrice de projection
    projection.setToIdentity();
    projection.perspective(0.70f, width/height, 1.0f, 1000.0f);

}
