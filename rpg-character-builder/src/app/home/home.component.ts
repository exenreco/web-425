import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

// Import Three.js (all of it)
import * as THREE from 'three';

// Import GSAP and the ScrollTrigger plugin
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  styles: [`
    /** {
      outline: 1px solid red;
    }*/
    .canvas {
      top: 0;
      left: 0;
      z-index: 1;
      width: 100vw;
      height: 100vh;
      position: fixed;
      overflow: hidden;
      background: #111;
    }
    .landing-screen::before {
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 2;
      width: 100vw;
      content: "";
      height: 100vh;
      overflow: hidden;
      position:  fixed;
      background: rgb(0, 0, 0);
      opacity: 0.25;
    }
    .landing-screen {
      top: 0;
      left: 0;
      right: 0;
      z-index: 3;
      width: auto;
      display: flex;
      flex: 1 1 auto;
      max-width: 100%;
      min-width: 100%;
      overflow-y: auto;
      align-items: center;
      justify-items: center;
      flex-direction: column;
      justify-content: center;
      position: absolute;
    }
    .section {
      z-index: 4;
      width: 100%;
      height: 100vh;
      display: flex;
      flex: 1 1 auto;
      margin: 0 0 0 0;
      padding: 0 0 0 0;
      position: relative;
      align-items: center;
      justify-content: center;
    }
    .section .content {
      z-index: 4;
      margin: 0 0 0 0;
      width: auto;
      height: auto;
      display: flex;
      flex: 1 1 auto;
      position: relative;
      max-width: 1440px;
      min-width: 200px;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .section .content .left,
    .section .content .right {
      z-index: 1;
      height: 80%;
      display: block;
    }
    .section .content .left {
      width: 50%;
      overflow: none;
    }
    .section .content .left img {
      width: auto;
      height: 520px;
      display: block;
      margin: auto;
    }
    .section .content .right {
      display: flex;
      flex: 1 1 auto;
      flex-direction: row;
      width: calc(100% - 50%);
      max-width: calc(100% - 50%);
      min-width: calc(100% - 50%);
    }
    .section .content .right .title {
      top: 5rem;
      left: 20%;
      margin: .2em;
      font-weight: 900;
      font-size: 2.4rem;
      text-align: center;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }
    .section .content .right .info,
    .section .content .right .info::before,
    .section .content .right .info::after {
      display: block;
    }
    .section .content .right .info {
      width: 70%;
      margin: auto;
      padding: .8em;
      position: relative;
    }
    .section .content .right .info::before,
    .section .content .right .info::after {
      content: '';
      margin: 0;
      width: 10em;
      height: 10em;
      padding: .8em;
      position: absolute;
    }
    .section .content .right .info::before {
      top: 0;
      left: 0;
      border-top: 4px solid red;
      border-left: 4px solid red;
    }
    .section .content .right .info::after {
      right: 0;
      bottom: 0;
      border-right: 4px solid red;
      border-bottom: 4px solid red;
    }
    .section .content .right .info .context-title {
      width: 12em;
      color: #fff;
      margin: auto;
      height: auto;
      display: flex;
      padding: .4em;
      flex: 1 1 auto;
      font-size: 1.4rem;
      margin-right: 0px;
      margin-bottom: 12px;
      text-align: center;
      align-items: center;
      text-decoration: none;
      justify-items: center;
      justify-content: center;
      transform: skew(-18deg);
      background: linear-gradient(to bottom right, red, purple);
    }
    .section .content .right .info .context {
      display: block;
      width: 95%;
      height: 95%;
      margin: auto;
      font-size: 1.6rem;
      line-height: 2rem;
      position: relative;
    }
    .section .content .right .info .context .btn {
      border: none;
      outline: none;
      cursor: pointer;
      background: blue;
      font-size: 1.2rem;
      border-radius: 20px;
      padding: .6em 1.2em .6em 1.2em;
    }

    /* Button Color Style Rules
    ** =================================================================*/
    .section .content .right .info .context .btn.primary {
      color: #fff;
      font-weight: bold;
      background: linear-gradient(to bottom right, red, purple);
      background-color: linear-gradient(to bottom right, red, purple);
      box-shadow: 1px 1px 4px 0.5px #333;
    }

    /* Sections Style Rules
    ** =================================================================*/
    .section.welcome {
      background: rgba(255, 0, 0, 0.25);
    }
    .section.about {
      background: rgba(0, 255, 0, 0.25);
    }
    .section.user-experience {
      background: rgba(0, 0, 255, 0.25);
    }
    .section.brands {
      background: rgba(226, 0, 116, 0.25);
    }
    .section.available {
      height: 32em;
      background: rgba(0, 0, 0, 0.25);
    }

    /* Brand list Style Rules
    ** =================================================================*/
    .section .content .left .brands-list {
      display: flex;
      flex: 1 1 auto;
      flex-wrap: wrap;
      background: rgba(255, 0, 0, .25);
      align-items: center;
      justify-items: center;
      justify-content: center;
      border-radius: 8px;
    }
    .section .content .left .brands-list .brand {
      display: block;
      font-size: 6rem;
      position: relative;
      background: rgba(255, 255, 255, 0.25);
      margin: 12px;
      padding: .2em;
      border-radius: 8px;
    }

    /* Download list Style Rules
    ** =================================================================*/
    .section.available .content {
      flex-direction: column;
    }
    .section .content .header-text {
      font-weight: bold;
      font-size: 2rem;
      text-align: center;
      margin-bottom: .8em;
    }
    .section .content .download-options {
      display: flex;
      flex: 1 1 auto;
      flex-wrap: wrap;
      align-items: start;
      justify-items: left;
      justify-content: left;
      border-radius: 8px;
    }
    .section .content .download-options .option {
      margin: .8em;
      padding: .4em;
      display: flex;
      flex: 1 1 auto;
      cursor: pointer;
      flex-wrap: nowrap;
      flex-direction: row;
      border: 2px solid #fff;
      border-radius: 8px;
    }
    .section .content .download-options .option i {
      padding: .2em .8em .2em .8em;
      font-size: 2.8rem;
    }
    .section .content .download-options .option .download-info {
      padding: .4em;
      display: flex;
      flex: 1 1 auto;
      flex-wrap: nowrap;
      flex-direction: column;
      font-size: 2rem;
    }
    .section .content .download-options .option .download-info small {
      font-size: 1rem;
    }

     /* tablet view */
    @media only screen and (max-width: 1024px) {
      .section .content {
        height: auto;
        flex-direction: column;
      }
      .section .content .left,
      .section .content .right {
        margin: .8em;
      }
      .section .content .left {
        margin-bottom: 2em;
        height: auto;
        max-height: none;
        min-height: none;
        width: 98%;
        max-width: none;
        min-width: none;
        position: relative;
        flex-direction: column;
      }
      .section .content .left img {
        height: 250px;
      }
      .section .content .right {
        width: 98%;
        max-width: none;
        min-width: none;
      }
      .section .content .right .title {
        top: initial;
        left: initial;
      }
      .section.available {
        height: 100vh;
      }
    }

    /* mobile view */
    @media only screen and (max-width: 1024px) {
      .section .content {
        height: auto;
        flex-direction: column;
      }
      .section .content .left {
        margin-bottom: 2em;
        height: auto;
        max-height: none;
        min-height: none;
        width: 98%;
        max-width: none;
        min-width: none;
        position: relative;
        flex-direction: column;
      }
      .section .content .left img {
        height: 250px;
      }
      .section .content .right {
        width: 98%;
        height: auto;
        max-width: none;
        min-width: none;
      }
      .section .content .right .title {
        top: initial;
        left: initial;
      }
      .section.available {
        height: 100vh;
      }
    }
  `],
  template: `
    <canvas #canvas class="canvas">Your browser does not support html5!</canvas>
    <main #scroller class="landing-screen">
      <div class="section welcome">
        <article class="content">
          <div class="left">
            <img src="images/character-1.png" alt="Character Standing with glasses">
          </div>
          <div class="right">
            <h1 class="title">RPG Character Builder</h1>
            <div class="info">
              <h2 class="context-title">Why RPG Character Builder?</h2>
              <p class="context">
                Welcome to your ultimate destination for building and managing your
                personal RPG characters! Here, you have the power to design every aspect
                of your characters – from their backstory to their unique abilities.
                Whether you’re a veteran gamer or just getting started in the world
                of role-playing games, our platform provides a detailed and immersive
                experience tailored to ignite your creativity.
                <br><br>
                <button class="btn primary">
                  Start Building
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </p>
            </div>
          </div>
        </article>
      </div>

      <div class="section about">
        <article class="content">
          <div class="right">
            <h1 class="title">Immersive Modeling Software</h1>
            <div class="info">
              <h2 class="context-title">An Immersive 3D Editor!</h2>
              <p class="context">
                Dive into a world where magic, might, and mystery await. With an array
                of customization options, you can experiment with different classes,
                skills, and equipment to create characters that truly represent
                your gaming style. Our intuitive interface ensures that every decision
                you make enhances the character’s personality and potential. Beyond
                just numbers and stats, you will explore the lore and legends behind
                each character, making your journey as much about storytelling as it
                is about strategic gameplay.
                <br><br>
                <button class="btn primary">
                  Editor Reviews
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </p>
            </div>
          </div>
          <div class="left">
            <img src="images/character-2.png" alt="Character Standing with sword">
          </div>
        </article>
      </div>

      <div class="section user-experience">
        <article class="content">
          <div class="left">
            <img src="images/character-3.webp" alt="Image of a dragon">
          </div>
          <div class="right">
            <h1 class="title">Top notch user experience!</h1>
            <div class="info">
              <h2 class="context-title">Our users are our top priority</h2>
              <p class="context">
                We believe that every character has a story to tell, and our tools are
                designed to bring those stories to life. Take your time to explore the
                various options, mix and match unique features, and create a cast of
                characters that you can be proud of. Join us on this epic adventure,
                and let your imagination run wild in a realm where every hero is celebrated
                and every legend begins with a single step.
                <br><br>
                <button class="btn primary">
                  Customer Reviews
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </p>
            </div>
          </div>
        </article>
      </div>

      <div class="section brands">
        <article class="content">
        <div class="right">
            <h1 class="title">Backbone to over 500 brands!</h1>
            <div class="info">
              <h2 class="context-title">Rated #1 By 500+ Brands!</h2>
              <p class="context">
                Join the ranks of over 500 top brands that have trusted and rated us
                as their number-one choice! Our commitment to excellence, innovation,
                and customer satisfaction has earned us a reputation as an
                industry leader. From startups to Fortune 500 companies,
                businesses across various sectors rely on our cutting-edge
                solutions to drive growth, enhance efficiency, and deliver
                outstanding results. Discover why brands continue to choose
                us as their go-to partner and experience the difference that sets
                us apart!
                <br><br>
                <button class="btn primary">
                  All Brands
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </p>
            </div>
          </div>
          <div class="left">
            <ul class="brands-list">
              <li class="brand"><i class="fa-brands fa-studiovinari"></i></li>
              <li class="brand"><i class="fa-brands fa-steam"></i></li>
              <li class="brand"><i class="fa-brands fa-playstation"></i></li>
              <li class="brand"><i class="fa-brands fa-twitch"></i></li>
              <li class="brand"><i class="fa-brands fa-brave"></i></li>
              <li class="brand"><i class="fa-brands fa-centos"></i></li>
              <li class="brand"><i class="fa-brands fa-firefox"></i></li>
              <li class="brand"><i class="fa-brands fa-opensuse"></i></li>
              <li class="brand"><i class="fa-brands fa-meta"></i></li>
              <li class="brand"><i class="fa-brands fa-patreon"></i></li>
            </ul>
          </div>
        </article>
      </div>

      <div class="section available">
        <article class="content">
          <h2 class="header-text">Download Available Now!</h2>
          <ul class="download-options">
            <li class="option">
              <i class="fa-brands fa-apple"></i>
              <h3 class="download-info">
                <small>Download on the</small>
                App Store
              </h3>
            </li>
            <li class="option">
              <i class="fa-brands fa-google-play"></i>
              <h3 class="download-info">
                <small>GET IT ON</small>
                Google Play
              </h3>
            </li>
            <li class="option">
              <i class="fa-brands fa-windows"></i>
              <h3 class="download-info">
                <small>GET IT ON</small>
                Windows
              </h3>
            </li>
            <li class="option">
              <i class="fa-brands fa-linux"></i>
              <h3 class="download-info">
                <small>GET IT ON</small>
                Linux
              </h3>
            </li>
          </ul>
        </article>
      </div>
    </main>
  `
})

export class HomeComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scroller', { static: false }) scroller!: ElementRef<HTMLElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;

  private shaderMaterial!: THREE.ShaderMaterial;
  private geometry!: THREE.PlaneGeometry;
  private quad!: THREE.Mesh;

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit triggered!");
    this.setupThreeJS();
    this.animate(0);
    this.initScrollAnimations();

    // Handle resize
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.shaderMaterial.uniforms['iResolution'].value.set(window.innerWidth, window.innerHeight, 1);
    });
  }

  setupThreeJS(): void {
    /// Use the canvas from the @ViewChild reference
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas.nativeElement, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a new scene
    this.scene = new THREE.Scene();

    // Setup a camera with field of view, aspect ratio, near and far clipping planes
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.camera.position.z = 0.5;

    try {
      // setup materials
      this.shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
          iScrollProgress: { value: 0 },
          iMergeAmount: { value: 0 },
          iColorShift: { value: 0 },
          iBallPositions: { value: [
            new THREE.Vector3(-3, 2, 0),
            new THREE.Vector3(3, -2, 1),
            new THREE.Vector3(-2, -3, 2),
            new THREE.Vector3(2, 3, -1),
            new THREE.Vector3(0, 0, 3),
            new THREE.Vector3(-1, 1, -2),
            new THREE.Vector3(1, -1, -3),
            new THREE.Vector3(0, 0, 0)
          ]}
        },
        vertexShader: `void main() {gl_Position = vec4(position, 1.0);}`,
        fragmentShader: `
          uniform float iTime;
          uniform vec3 iResolution;
          uniform float iScrollProgress;
          uniform float iMergeAmount;
          uniform float iColorShift;
          uniform vec3 iBallPositions[8];

          // 3D gradient noise from iq's https://www.shadertoy.com/view/Xsl3Dl
          vec3 hash(vec3 p) {
              p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                        dot(p, vec3(269.5, 183.3, 246.1)),
                        dot(p, vec3(113.5, 271.9, 124.6)));
              return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
          }

          float noise(in vec3 p) {
              vec3 i = floor(p);
              vec3 f = fract(p);

              vec3 u = f * f * (3.0 - 2.0 * f);
              return mix(
                  mix(
                      mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
                          dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
                      mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
                          dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
                  mix(
                      mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
                          dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
                      mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
                          dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
          }

          void main() {
              vec2 fragCoord = gl_FragCoord.xy;
              vec4 fragColor;

              vec3 dir = normalize(vec3((2.0 * fragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y), 1.7));
              vec3 p = vec3(0, 0, -7);
              vec3 gradient, q, a;
              float dist, b;

              for(int i = 0; i < 100; i++) {
                  q = p; // save current position
                  p += dir * dist; // step
                  gradient = vec3(0);
                  dist = 0.0;

                  for(int j = 0; j < 8; j++) {
                      vec3 ballp = iBallPositions[j];

                      // Apply scroll animations to ball positions
                      ballp.x += sin(iTime * 0.3 + float(j) * 0.5 + iScrollProgress * 3.0) * (3.0 - iMergeAmount * 2.5);
                      ballp.y += cos(iTime * 0.2 + float(j) * 0.7 + iScrollProgress * 2.0) * (3.0 - iMergeAmount * 2.5);
                      ballp.z += sin(iTime * 0.4 + float(j) * 0.3 + iScrollProgress * 4.0) * (3.0 - iMergeAmount * 2.5);

                      // As merge amount increases, pull balls toward center
                      ballp = mix(ballp, vec3(0.0), iMergeAmount);

                      b = dot(a = p - ballp, a);

                      // Adjust strength of each ball based on scroll
                      float strength = 1.0 + iMergeAmount * 2.0;
                      gradient += a / (b * b) * strength;
                      dist += strength / b;
                  }

                  dist = 1.0 - dist;

                  if(dist < 0.001) { // if we've hit the metaballs
                      dir = reflect(dir, normalize(gradient)); // set new reflected direction
                      p = q; // restore previous position
                      dist = 0.0; // and don't step in this iteration
                  }
              }

              // Color based on reflection direction, with scroll-based color shifts
              vec3 col = dir * 0.5 + 0.5; // normalize to 0-1 range

              // Add noise-based coloring with time and scroll animation
              float noiseVal = noise(col * 2.0 + iTime * 0.3 + iScrollProgress);

              vec3 finalColor = col * 2.0 * noiseVal;

              // Color shifting based on scroll
              finalColor = mix(
                  finalColor,
                  vec3(finalColor.g, finalColor.b, finalColor.r), // RGB shift
                  iColorShift
              );

              // Ensure colors are properly mapped to output range
              finalColor = clamp(finalColor, 0.0, 1.0);

              fragColor = vec4(finalColor, 1.0);
              gl_FragColor = fragColor;
          }
      `});


      // Create Full screen quad
      this.geometry = new THREE.PlaneGeometry(2, 2);
      this.quad = new THREE.Mesh(this.geometry, this.shaderMaterial);
      this.scene.add(this.quad);
    } catch(error){
      console.log(`There was an error when creating the 3D render: ${error}`);
    }
  }

  animate( time = 0 ) {
    time *= 0.001; // Convert to seconds

    // Update time uniform
    this.shaderMaterial.uniforms['iTime'].value = time;

    // Render
    this.renderer.render(this.scene, this.camera);

    // Request next frame
    requestAnimationFrame(this.animate.bind(this));
  }

  // Initialize GSAP ScrollTrigger animations
  initScrollAnimations() {
    // Main scroll progress animation
    gsap.to(this.shaderMaterial.uniforms['iScrollProgress'], {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: this.scroller.nativeElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // Merging metaballs animation
    gsap.timeline({ scrollTrigger: {
      trigger: this.scroller.nativeElement,
      start: "33% top",
      end: "66% bottom",
      scrub: true
    }}).to(this.shaderMaterial.uniforms['iMergeAmount'], {
      value: 1,
      duration: 1,
      ease: "power2.inOut"
    }).to(this.shaderMaterial.uniforms['iMergeAmount'], {
      value: 0,
      duration: 1,
      ease: "power2.inOut"
    });

    // Color shift animation
    gsap.timeline({ scrollTrigger: {
      trigger: this.scroller.nativeElement,
      start: "50% top",
      end: "bottom bottom",
      scrub: true
    }}).to(this.shaderMaterial.uniforms['iColorShift'], {
      value: 1,
      duration: 1,
      ease: "sine.inOut"
    }).to(this.shaderMaterial.uniforms['iColorShift'], {
      value: 0,
      duration: 1,
      ease: "sine.inOut"
    });
  }
}
