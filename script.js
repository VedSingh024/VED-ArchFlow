// =====================================================
// VED ARCHFLOW
// FINAL FRONTEND CONTROLLER
// IMAGE VIEWER + VIEW BUTTONS + CENTER MESSAGES
// NAVIGATION HOVER + MOBILE ACTIVE UNDERLINE
// =====================================================


// =====================================================
// DOM ELEMENTS
// =====================================================

const uploadBtn =
    document.getElementById("uploadBtn");

const generateBtn =
    document.getElementById("generateBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const floorplan =
    document.getElementById("floorplan");

const container =
    document.getElementById("viewer");

const viewReset =
    document.getElementById("viewReset");

const viewTop =
    document.getElementById("viewTop");

const viewPerspective =
    document.getElementById("viewPerspective");


// =====================================================
// NAVIGATION ELEMENTS
// =====================================================

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


// =====================================================
// STATE
// =====================================================

let selectedFile = null;

let generated = false;

let modelURL = null;


// =====================================================
// IMAGE PATHS
// =====================================================

const VED_IMAGE_1 =
    "./ved 1.png";

const VED_IMAGE_2 =
    "./ved 2.png";

const VED_IMAGE_3 =
    "./ved 3.png";


// =====================================================
// VIEW MESSAGES
// =====================================================

const VIEW_MESSAGES = {

    image1:
        "Website is currently under development.",

    image2:
        "Accurate results. Exceptional experiences.",

    image3:
        "Thanks for visiting VED ArchFlow."

};


// =====================================================
// INITIAL STATE
// =====================================================

if (generateBtn) {

    generateBtn.disabled = true;

}


if (downloadBtn) {

    downloadBtn.disabled = true;

}


// =====================================================
// NAVIGATION ACTIVE STATE
//
// DESKTOP:
// CSS handles hover underline.
//
// MOBILE / TABLET:
// JavaScript adds active class to the
// exact link that was tapped.
//
// IMPORTANT:
// No scroll listener.
// No automatic section detection.
// This prevents Home from becoming active
// again automatically.
// =====================================================

function setActiveNavLink(activeLink) {

    if (!activeLink) {

        return;

    }


    navLinks.forEach(
        function(link) {

            link.classList.remove(
                "active"
            );

        }
    );


    activeLink.classList.add(
        "active"
    );

}


// =====================================================
// NAVIGATION CLICK / TAP
//
// EXACTLY THE CLICKED LINK GETS ACTIVE
// =====================================================

navLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function() {

                setActiveNavLink(
                    link
                );

            }
        );

    }
);


// =====================================================
// INITIAL MOBILE ACTIVE LINK
//
// ONLY FIRST NAV LINK = HOME
// ON MOBILE / TABLET
//
// DESKTOP:
// NO ACTIVE CLASS.
// DESKTOP IS PURE HOVER.
// =====================================================

function setInitialNavLink() {

    if (!navLinks.length) {

        return;

    }


    // Remove any old active class

    navLinks.forEach(
        function(link) {

            link.classList.remove(
                "active"
            );

        }
    );


    // Mobile / Tablet only

    if (
        window.innerWidth <=
        768
    ) {

        // Home is first link

        navLinks[0].classList.add(
            "active"
        );

    }

}


// =====================================================
// INITIAL NAVIGATION
// =====================================================

setInitialNavLink();


// =====================================================
// IMPORTANT
//
// NO SCROLL BASED ACTIVE NAVIGATION.
//
// DO NOT ADD:
//
// window.addEventListener("scroll", ...)
//
// Because that was forcing Home / another section
// to become active automatically.
//
// The underline now moves ONLY when the user
// taps another navigation button.
// =====================================================


// =====================================================
// REMOVE DEFAULT VIEWER PLACEHOLDER
// =====================================================

function removeDefaultViewerContent() {

    if (!container) {

        return;

    }


    // ---------------------------------------------
    // REMOVE COMMON EMPTY PLACEHOLDER ELEMENTS
    // ---------------------------------------------

    const emptyElements =
        container.querySelectorAll(

            ".viewer-empty, " +

            ".empty-state, " +

            ".empty-message, " +

            ".placeholder, " +

            ".placeholder-text, " +

            ".no-model, " +

            ".no-model-message, " +

            ".model-empty"

        );


    emptyElements.forEach(
        function(element) {

            element.remove();

        }
    );


    // ---------------------------------------------
    // REMOVE ELEMENTS CONTAINING DEFAULT TEXT
    // ---------------------------------------------

    const allElements =
        container.querySelectorAll(
            "div, span, p, h1, h2, h3, h4, h5, h6"
        );


    allElements.forEach(
        function(element) {

            const text =
                element.textContent
                    .trim()
                    .toLowerCase();


            // Never touch viewport controls

            if (
                element.closest(
                    ".viewport-controls"
                )
            ) {

                return;

            }


            // Never touch top bar

            if (
                element.closest(
                    ".viewport-topbar"
                )
            ) {

                return;

            }


            // Never touch axis

            if (
                element.closest(
                    ".viewport-axis"
                )
            ) {

                return;

            }


            // Remove default placeholder text

            if (

                text ===
                "no 3d model yet"

                ||

                text ===
                "choose a floor plan"

                ||

                text ===
                "choose floor plan"

                ||

                text ===
                "upload a floor plan"

                ||

                text ===
                "upload floor plan"

                ||

                text ===
                "no model yet"

            ) {

                element.remove();

            }

        }
    );

}


// =====================================================
// REMOVE PLACEHOLDER IMMEDIATELY
// =====================================================

removeDefaultViewerContent();


// =====================================================
// SHOW VIEWER IMAGE
//
// IMAGE + ONE CENTER MESSAGE
//
// EXISTING VIEWPORT BUTTONS ARE NOT REMOVED
// =====================================================

function showViewerImage(
    imagePath,
    message
) {

    if (!container) {

        return;

    }


    // ---------------------------------------------
    // REMOVE DEFAULT PLACEHOLDER
    // ---------------------------------------------

    removeDefaultViewerContent();


    // ---------------------------------------------
    // REMOVE PREVIOUS ARCHFLOW IMAGE
    // ---------------------------------------------

    const oldImage =
        container.querySelector(
            ".archflow-viewer-image"
        );


    if (oldImage) {

        oldImage.remove();

    }


    // ---------------------------------------------
    // REMOVE PREVIOUS ARCHFLOW MESSAGE
    // ---------------------------------------------

    const oldMessage =
        container.querySelector(
            ".archflow-viewer-message"
        );


    if (oldMessage) {

        oldMessage.remove();

    }


    // ---------------------------------------------
    // REMOVE OLD DEMO MODEL
    // ---------------------------------------------

    const oldModel =
        container.querySelector(
            ".demo-house"
        );


    if (oldModel) {

        oldModel.remove();

    }


    // ---------------------------------------------
    // CREATE IMAGE
    // ---------------------------------------------

    const image =
        document.createElement(
            "img"
        );


    image.className =
        "archflow-viewer-image";


    image.src =
        imagePath;


    image.alt =
        "";


    // ---------------------------------------------
    // FULL VIEWER IMAGE
    // ---------------------------------------------

    image.style.position =
        "absolute";

    image.style.left =
        "0";

    image.style.top =
        "0";

    image.style.right =
        "0";

    image.style.bottom =
        "0";

    image.style.width =
        "100%";

    image.style.height =
        "100%";

    image.style.maxWidth =
        "none";

    image.style.maxHeight =
        "none";

    image.style.objectFit =
        "cover";

    image.style.objectPosition =
        "center";

    image.style.display =
        "block";

    image.style.margin =
        "0";

    image.style.padding =
        "0";

    image.style.border =
        "0";

    image.style.borderRadius =
        "0";


    // Image behind controls

    image.style.zIndex =
        "1";


    // ---------------------------------------------
    // ADD IMAGE
    // ---------------------------------------------

    container.appendChild(
        image
    );


    // ---------------------------------------------
    // CREATE CENTER MESSAGE
    // ---------------------------------------------

    if (message) {

        const messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            "archflow-viewer-message";


        messageElement.innerText =
            message;


        container.appendChild(
            messageElement
        );

    }


    // ---------------------------------------------
    // IMAGE ERROR
    // ---------------------------------------------

    image.onerror =
        function() {

            console.error(
                "IMAGE NOT FOUND:",
                imagePath
            );

        };

}


// =====================================================
// UPLOAD BUTTON
// =====================================================

if (
    uploadBtn &&
    floorplan
) {

    uploadBtn.addEventListener(
        "click",
        function() {

            if (selectedFile) {

                return;

            }


            floorplan.click();

        }
    );

}


// =====================================================
// FILE SELECTED
// =====================================================

if (floorplan) {

    floorplan.addEventListener(
        "change",
        function() {

            if (
                !floorplan.files ||
                !floorplan.files.length
            ) {

                return;

            }


            // -----------------------------------------
            // SAVE SELECTED FILE
            // -----------------------------------------

            selectedFile =
                floorplan.files[0];


            // -----------------------------------------
            // UPDATE UPLOAD BUTTON
            // -----------------------------------------

            if (uploadBtn) {

                uploadBtn.innerText =
                    "✓ Floor Plan Selected";


                uploadBtn.disabled =
                    true;

            }


            // -----------------------------------------
            // ENABLE GENERATE
            // -----------------------------------------

            if (generateBtn) {

                generateBtn.disabled =
                    false;


                generateBtn.innerText =
                    "Generate 3D Model";

            }


            console.log(
                "Floor Plan Selected:",
                selectedFile.name
            );

        }
    );

}


// =====================================================
// GENERATE BUTTON
//
// GENERATE
// → VED 1
// → WEBSITE UNDER DEVELOPMENT
// =====================================================

if (generateBtn) {

    generateBtn.addEventListener(
        "click",
        function() {

            // -----------------------------------------
            // CHECK FILE
            // -----------------------------------------

            if (!selectedFile) {

                alert(
                    "Please select a floor plan first."
                );

                return;

            }


            // -----------------------------------------
            // PREVENT SECOND GENERATION
            // -----------------------------------------

            if (generated) {

                return;

            }


            // -----------------------------------------
            // REMOVE PLACEHOLDER
            // -----------------------------------------

            removeDefaultViewerContent();


            // -----------------------------------------
            // GENERATING
            // -----------------------------------------

            generateBtn.disabled =
                true;


            generateBtn.innerText =
                "Generating 3D Model...";


            // -----------------------------------------
            // LOCK DOWNLOAD
            // -----------------------------------------

            if (downloadBtn) {

                downloadBtn.disabled =
                    true;

            }


            // -----------------------------------------
            // GENERATION SIMULATION
            // -----------------------------------------

            setTimeout(
                function() {

                    generated =
                        true;


                    // ---------------------------------
                    // VED 1
                    // ---------------------------------

                    showViewerImage(

                        VED_IMAGE_1,

                        VIEW_MESSAGES.image1

                    );


                    // ---------------------------------
                    // GENERATION COMPLETE
                    // ---------------------------------

                    generateBtn.innerText =
                        "✓ 3D Model Generated";


                    generateBtn.disabled =
                        true;


                    // ---------------------------------
                    // ENABLE DOWNLOAD
                    // ---------------------------------

                    if (downloadBtn) {

                        downloadBtn.disabled =
                            false;

                    }


                    console.log(
                        "3D MODEL GENERATED"
                    );

                },

                1500

            );

        }
    );

}


// =====================================================
// DOWNLOAD BUTTON
// =====================================================

if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        function() {

            if (!generated) {

                return;

            }


            // -----------------------------------------
            // DEMO DOWNLOAD FILE
            // -----------------------------------------

            const demoModel =

`VED ARCHFLOW 3D MODEL

Generated from:
${selectedFile
    ? selectedFile.name
    : "Floor Plan"}

VED ArchFlow Architectural Visualization
`;


            const blob =
                new Blob(
                    [demoModel],
                    {
                        type:
                            "model/gltf-binary"
                    }
                );


            modelURL =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                modelURL;


            link.download =
                "VED_ARCHFLOW_HOUSE.glb";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            setTimeout(
                function() {

                    URL.revokeObjectURL(
                        modelURL
                    );

                },

                1000

            );


            console.log(
                "DOWNLOAD STARTED"
            );

        }
    );

}


// =====================================================
// RESET VIEW
//
// VED 1
// =====================================================

if (viewReset) {

    viewReset.addEventListener(
        "click",
        function() {

            if (!generated) {

                return;

            }


            showViewerImage(

                VED_IMAGE_1,

                VIEW_MESSAGES.image1

            );

        }
    );

}


// =====================================================
// TOP VIEW
//
// VED 2
// =====================================================

if (viewTop) {

    viewTop.addEventListener(
        "click",
        function() {

            if (!generated) {

                return;

            }


            showViewerImage(

                VED_IMAGE_2,

                VIEW_MESSAGES.image2

            );

        }
    );

}


// =====================================================
// PERSPECTIVE VIEW
//
// VED 3
// =====================================================

if (viewPerspective) {

    viewPerspective.addEventListener(
        "click",
        function() {

            if (!generated) {

                return;

            }


            showViewerImage(

                VED_IMAGE_3,

                VIEW_MESSAGES.image3

            );

        }
    );

}


// =====================================================
// VIEWER CSS
// =====================================================

const viewerStyle =
    document.createElement(
        "style"
    );


viewerStyle.innerHTML = `

/* =========================================
   VIEWER
========================================= */

#viewer {

    position: relative !important;

    overflow: hidden !important;

    padding: 0 !important;

}


/* =========================================
   IMAGE
========================================= */

#viewer .archflow-viewer-image {

    position: absolute !important;

    left: 0 !important;

    top: 0 !important;

    right: 0 !important;

    bottom: 0 !important;

    width: 100% !important;

    height: 100% !important;

    max-width: none !important;

    max-height: none !important;

    object-fit: cover !important;

    object-position: center !important;

    display: block !important;

    margin: 0 !important;

    padding: 0 !important;

    border: 0 !important;

    border-radius: 0 !important;

    z-index: 1 !important;

}


/* =========================================
   CENTER MESSAGE
========================================= */

#viewer .archflow-viewer-message {

    position: absolute !important;

    left: 50% !important;

    top: 50% !important;

    transform:
        translate(-50%, -50%) !important;

    width: max-content !important;

    max-width: 80% !important;

    text-align: center !important;

    color:
        rgba(255, 255, 255, 0.68) !important;

    font-family:
        "Inter",
        sans-serif !important;

    font-size: 13px !important;

    font-weight: 500 !important;

    letter-spacing: 0.25px !important;

    line-height: 1.5 !important;

    text-shadow:
        0 2px 12px
        rgba(0, 0, 0, 0.65) !important;

    pointer-events: none !important;

    z-index: 20 !important;

}


/* =========================================
   REMOVE DEFAULT EMPTY VIEWER TEXT
========================================= */

#viewer .viewer-empty,

#viewer .empty-state,

#viewer .empty-message,

#viewer .placeholder,

#viewer .placeholder-text,

#viewer .no-model,

#viewer .no-model-message,

#viewer .model-empty {

    display: none !important;

}


/* =========================================
   VIEWPORT CONTROLS
========================================= */

#viewer .viewport-controls {

    position: absolute !important;

    z-index: 30 !important;

}


/* =========================================
   VIEWPORT TOP BAR
========================================= */

#viewer .viewport-topbar {

    position: absolute !important;

    z-index: 30 !important;

}


/* =========================================
   VIEWPORT AXIS
========================================= */

#viewer .viewport-axis {

    position: absolute !important;

    z-index: 30 !important;

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

    #viewer .archflow-viewer-message {

        font-size: 11px !important;

        max-width: 80% !important;

    }

}

`;

document.head.appendChild(
    viewerStyle
);


// =====================================================
// NAVIGATION ACTIVE UNDERLINE
//
// DESKTOP:
// ONLY HOVER
//
// MOBILE / TABLET:
// ACTIVE CLASS ONLY
//
// IMPORTANT:
// !important is used so this CSS
// overrides any previous CSS.
// =====================================================

const navigationStyle =
    document.createElement(
        "style"
    );


navigationStyle.innerHTML = `

/* =========================================
   NAVIGATION BASE
========================================= */

.nav-links a {

    position: relative !important;

    text-decoration: none !important;

    border-bottom: none !important;

}


/* =========================================
   REMOVE ANY OLD UNDERLINES
========================================= */

.nav-links a::before {

    content: none !important;

}


/* =========================================
   UNDERLINE
========================================= */

.nav-links a::after {

    content: "" !important;

    position: absolute !important;

    left: 50% !important;

    bottom: 0 !important;

    width: 0 !important;

    height: 2px !important;

    border: 0 !important;

    border-radius: 10px !important;

    transform:
        translateX(-50%) !important;

    background:
        linear-gradient(
            90deg,
            var(--primary),
            var(--secondary)
        ) !important;

    transition:
        width 0.25s ease !important;

    pointer-events: none !important;

}


/* =========================================
   DESKTOP / LAPTOP
   HOVER ONLY
========================================= */

@media (min-width: 769px) {

    .nav-links a:hover {

        color: #FFFFFF !important;

    }


    .nav-links a:hover::after {

        width: 45px !important;

    }


    /* No permanent active underline */

    .nav-links a.active::after {

        width: 0 !important;

    }

}


/* =========================================
   MOBILE / TABLET
   CLICKED ITEM STAYS ACTIVE
========================================= */

@media (max-width: 768px) {

    .nav-links a:hover::after {

        width: 0 !important;

    }


    .nav-links a:active::after {

        width: 45px !important;

    }


    .nav-links a.active {

        color: #FFFFFF !important;

    }


    .nav-links a.active::after {

        width: 45px !important;

    }

}


/* =========================================
   TOUCH DEVICES
========================================= */

@media (hover: none) and (pointer: coarse) {

    .nav-links a {

        -webkit-tap-highlight-color:
            transparent !important;

        touch-action: manipulation;

    }

}

`;

document.head.appendChild(
    navigationStyle
);


// =====================================================
// HERO — DESKTOP ONE LINE
// =====================================================

const heroTitle =
    document.querySelector(
        ".hero h1"
    );


if (heroTitle) {

    heroTitle.style.whiteSpace =
        "nowrap";

}


// =====================================================
// HERO RESPONSIVE
// =====================================================

const mobileStyle =
    document.createElement(
        "style"
    );


mobileStyle.innerHTML = `

@media (min-width: 769px) {

    .hero h1 {

        white-space:
            nowrap !important;

    }

}


@media (max-width: 768px) {

    .hero h1 {

        white-space:
            normal !important;

    }

}

`;

document.head.appendChild(
    mobileStyle
);


// =====================================================
// FINAL INITIALIZATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        removeDefaultViewerContent();

        setInitialNavLink();

    }
);


// =====================================================
// VED ARCHFLOW CONTROLLER READY
// =====================================================

console.log(
    "VED ArchFlow Frontend Controller Ready."
);
