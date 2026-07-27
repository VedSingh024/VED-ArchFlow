// =====================================================
// VED ARCHFLOW
// FINAL FRONTEND CONTROLLER
// IMAGE VIEWER + VIEW BUTTONS + CENTER MESSAGES
// NAVIGATION ACTIVE STATE
//
// DESKTOP / LAPTOP:
// Hover = underline only
//
// MOBILE / TABLET:
// Current page = permanent underline
// Home = active on Home page
// Guide = active on Guide page
// History = active on History page
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
// DESKTOP / LAPTOP:
// Active class does not show permanent underline.
// CSS hover controls the underline.
//
// MOBILE / TABLET:
// Active class shows permanent underline.
//
// IMPORTANT:
// Current page is detected automatically.
// Home is NOT forced active on every page.
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
// DETECT CURRENT PAGE
// =====================================================

function setInitialNavLink() {

    if (!navLinks.length) {

        return;

    }


    // ---------------------------------------------
    // GET CURRENT PAGE NAME
    // ---------------------------------------------

    let currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    // ---------------------------------------------
    // IF NO PAGE NAME
    // DEFAULT TO HOME
    // ---------------------------------------------

    if (
        !currentPage ||
        currentPage === ""
    ) {

        currentPage =
            "index.html";

    }


    // ---------------------------------------------
    // FIND CURRENT PAGE LINK
    // ---------------------------------------------

    let activeLink = null;


    navLinks.forEach(
        function(link) {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {

                return;

            }


            const cleanHref =
                href
                    .split("/")
                    .pop()
                    .split("?")[0]
                    .split("#")[0]
                    .toLowerCase();


            // -----------------------------------------
            // HOME
            // -----------------------------------------

            if (

                (
                    currentPage ===
                    "index.html"

                    ||

                    currentPage ===
                    ""
                )

                &&

                cleanHref ===
                "index.html"

            ) {

                activeLink =
                    link;

            }


            // -----------------------------------------
            // GUIDE
            // -----------------------------------------

            else if (

                currentPage ===
                "guide.html"

                &&

                cleanHref ===
                "guide.html"

            ) {

                activeLink =
                    link;

            }


            // -----------------------------------------
            // HISTORY
            // -----------------------------------------

            else if (

                currentPage ===
                "history.html"

                &&

                cleanHref ===
                "history.html"

            ) {

                activeLink =
                    link;

            }

        }
    );


    // ---------------------------------------------
    // SET CURRENT PAGE ACTIVE
    // ---------------------------------------------

    if (activeLink) {

        setActiveNavLink(
            activeLink
        );

    }


    // ---------------------------------------------
    // FALLBACK
    // ---------------------------------------------

    else if (navLinks.length) {

        setActiveNavLink(
            navLinks[0]
        );

    }

}


// =====================================================
// NAVIGATION CLICK / TAP
//
// MOBILE / TABLET:
// Selected link becomes active immediately.
//
// DESKTOP:
// Active class changes internally,
// but CSS keeps underline hover-only.
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
// SET CORRECT ACTIVE PAGE ON LOAD
// =====================================================

setInitialNavLink();


// =====================================================
// IMPORTANT:
//
// NO SCROLL ACTIVE NAVIGATION.
//
// Home will NOT become active while scrolling.
//
// The current page controls the active state.
// =====================================================


// =====================================================
// REMOVE DEFAULT VIEWER CONTENT
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
    // REMOVE DEFAULT TEXT
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


            // Never touch controls

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
    // REMOVE PREVIOUS IMAGE
    // ---------------------------------------------

    const oldImage =
        container.querySelector(
            ".archflow-viewer-image"
        );


    if (oldImage) {

        oldImage.remove();

    }


    // ---------------------------------------------
    // REMOVE PREVIOUS MESSAGE
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
    // IMAGE POSITION
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


            // Save selected file

            selectedFile =
                floorplan.files[0];


            // Update upload button

            if (uploadBtn) {

                uploadBtn.innerText =
                    "✓ Floor Plan Selected";


                uploadBtn.disabled =
                    true;

            }


            // Enable generate

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
// =====================================================

if (generateBtn) {

    generateBtn.addEventListener(
        "click",
        function() {

            // Check file

            if (!selectedFile) {

                alert(
                    "Please select a floor plan first."
                );

                return;

            }


            // Prevent second generation

            if (generated) {

                return;

            }


            // Remove placeholder

            removeDefaultViewerContent();


            // Generating

            generateBtn.disabled =
                true;


            generateBtn.innerText =
                "Generating 3D Model...";


            // Lock download

            if (downloadBtn) {

                downloadBtn.disabled =
                    true;

            }


            // Generation simulation

            setTimeout(
                function() {

                    generated =
                        true;


                    // VED 1

                    showViewerImage(

                        VED_IMAGE_1,

                        VIEW_MESSAGES.image1

                    );


                    // Generation complete

                    generateBtn.innerText =
                        "✓ 3D Model Generated";


                    generateBtn.disabled =
                        true;


                    // Enable download

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

#viewer {

    position: relative !important;

    overflow: hidden !important;

    padding: 0 !important;

}


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


#viewer .viewport-controls {

    position: absolute !important;

    z-index: 30 !important;

}


#viewer .viewport-topbar {

    position: absolute !important;

    z-index: 30 !important;

}


#viewer .viewport-axis {

    position: absolute !important;

    z-index: 30 !important;

}


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
// NAVIGATION ACTIVE UNDERLINE CSS
//
// DESKTOP:
// Hover = purple underline only
//
// MOBILE / TABLET:
// Current page = permanent purple underline
//
// =====================================================

const navigationStyle =
    document.createElement(
        "style"
    );


navigationStyle.innerHTML = `


/* =========================================
   BASE NAVIGATION
========================================= */

.nav-links a {

    position: relative;

    -webkit-tap-highlight-color:
        transparent;

}


/* =========================================
   STANDARD PURPLE UNDERLINE
========================================= */

.nav-links a::after {

    content: "";

    position: absolute;

    left: 50%;

    bottom: 0;

    width: 0;

    height: 2px;

    border-radius: 10px;

    transform:
        translateX(-50%);

    background:

        linear-gradient(
            90deg,
            var(--primary),
            var(--secondary)
        );

    transition:
        width 0.25s ease;

    pointer-events: none;

}


/* =========================================
   DESKTOP / LAPTOP
   HOVER ONLY
========================================= */

@media (min-width: 769px) {

    .nav-links a:hover {

        color:
            #FFFFFF;

    }


    .nav-links a:hover::after {

        width:
            45px;

    }


    /* Active page does NOT
       keep permanent underline */

    .nav-links a.active::after {

        width:
            0 !important;

    }

}


/* =========================================
   MOBILE / TABLET
   SELECTED PAGE ONLY
========================================= */

@media (max-width: 768px) {

    /* Normal links */

    .nav-links a {

        color:
            #B7C0D4;

    }


    /* Selected page */

    .nav-links a.active {

        color:
            #FFFFFF;

    }


    /* Permanent underline
       on selected page */

    .nav-links a.active::after {

        width:
            45px !important;

    }


    /* Touch feedback does not
       remove the selected underline */

    .nav-links a:active::after {

        width:
            45px;

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
//
// IMPORTANT:
// Active navigation is already initialized above.
// Do not reset it again here.
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        removeDefaultViewerContent();

    }
);


// =====================================================
// VED ARCHFLOW CONTROLLER READY
// =====================================================

console.log(
    "VED ArchFlow Frontend Controller Ready."
);
