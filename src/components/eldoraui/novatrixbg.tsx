'use client';
import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const vert = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}
`;

const frag = `
precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
varying vec2 vUv;

void main() {
    float mr = min(uResolution.x, uResolution.y);
    vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

    float d = -uTime * 1.2;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
        a += cos(i - d - a * uv.x);
        d += sin(uv.y * i + a);
    }
    d += uTime * 1.0;
    vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
    gl_FragColor = vec4(col * uColor, 1.0);
}
`;

export const Background = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const renderer = new Renderer();
        const gl = renderer.gl;
        gl.clearColor(1, 1, 1, 1);

        const handleResize = () => {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vert,
            fragment: frag,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color(0.3, 0.5, 0.8) }, // Màu xanh nhạt hơn
                uResolution: {
                    value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height],
                },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });
        let animationFrame: number;

        const update = (t: number) => {
            animationFrame = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.0003; // Giảm tốc độ hiệu ứng
            renderer.render({ scene: mesh });
        };

        animationFrame = requestAnimationFrame(update);
        container.appendChild(gl.canvas);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", handleResize);
            container.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 -z-10" />;
};

export default Background;