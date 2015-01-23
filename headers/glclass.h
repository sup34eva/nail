#ifndef GLCLASS_H
#define GLCLASS_H

#include <QOpenGLWidget>
#include <QOpenGLFunctions>
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>


class GLclass : public QOpenGLWidget, protected QOpenGLFunctions
{
public:
    GLclass(QWidget* parent = 0);
    ~GLclass();
    QSize sizeHint() const {  return QSize(400, 400); }

protected:
    void initializeGL();
    void paintGL();
    void resizeGL(float width,float height);

private:

    QOpenGLShaderProgram m_program;
    GLuint VertexArrayID;
    // Ceci identifiera notre tampon de sommets
    GLuint vertexbuffer;
    std::vector<GLfloat> triangleVertices;
    QMatrix4x4 projection;
    QMatrix4x4 view;
    QMatrix4x4 transform;
};

#endif // GLCLASS_H
