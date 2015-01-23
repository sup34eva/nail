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
    //void resizeGL(int width, int height);

private:

    QOpenGLShaderProgram m_program;
    GLuint VertexArrayID;
    // Ceci identifiera notre tampon de sommets
    GLuint vertexbuffer;
    std::vector<GLfloat> triangleVertices;
};

#endif // GLCLASS_H
