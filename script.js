// =====================================================
// VED ARCHFLOW
// FINAL FRONTEND CONTROLLER
// IMAGE VIEWER + VIEW BUTTONS + CENTER MESSAGES
// REMOVE DEFAULT VIEWER PLACEHOLDER TEXT
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
// STATE
// =====================================================

let selectedFile = null;

let generated = false;

let modelURL = null;


// =====================================================
// IMAGE PATHS
//
// F:\Ved arch\frontend
//
// ved 1.png
// ved 2.png
// ved 3.png
// =====================================================

const VED_IMAGE_1 =
    "./ved%201.png";

const VED_IMAGE_2 =
    "./ved%202.png";

const VED_IMAGE_3 =
    "./ved%203.png";


// =====================================================
// VIEW MESSAGES
//
// ONLY THESE MESSAGES WILL APPEAR
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
// REMOVE DEFAULT VIEWER PLACEHOLDER
//
// Removes:
// No 3D Model Yet
// Choose a Floor Plan
// Upload a Floor Plan
// Any default empty viewer text
//
// DOES NOT REMOVE:
// Reset View
// Top
// Perspective
// VED ArchFlow top bar
// Axis
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
    // ONLY IF THEY ARE NOT CONTROLS
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


    // Image stays behind controls
    image.style.zIndex =
        "1";


    // ---------------------------------------------
    // ADD IMAGE
    // ---------------------------------------------

    container.appendChild(
        image
    );


    // ---------------------------------------------
    // CREATE ONLY REQUESTED CENTER MESSAGE
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
// → Website is currently under development
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
                    // VED 1 + MESSAGE
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
// WEBSITE IS CURRENTLY UNDER DEVELOPMENT
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
// ACCURATE RESULTS. EXCEPTIONAL EXPERIENCES.
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
// THANKS FOR VISITING VED ARCHFLOW.
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
//
// IMAGE:
// FULL WIDTH
// FULL HEIGHT
// NO BORDER
//
// MESSAGE:
// SMALL
// CENTER
// LIGHT
// FADED
//
// CONTROLS:
// ABOVE IMAGE
// CLICKABLE
//
// DEFAULT PLACEHOLDER:
// HIDDEN
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
   ONLY CENTER MESSAGE
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
   ABOVE IMAGE
========================================= */

#viewer .viewport-controls {

    position: absolute !important;

    z-index: 30 !important;

}


/* =========================================
   VIEWPORT TOP BAR
   ABOVE IMAGE
========================================= */

#viewer .viewport-topbar {

    position: absolute !important;

    z-index: 30 !important;

}


/* =========================================
   VIEWPORT AXIS
   ABOVE IMAGE
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