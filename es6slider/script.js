
class EdSlider {
    constructor({ main, wrap, slideW, prev, next, slidesToShow = 4, TimeoutAnimation, responsive = [] }) {
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slide = document.querySelector(wrap).children;
        this.slideW = document.querySelector(slideW).clientWidth;
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.pos = this.wrap.clientWidth;
        this.slidesToShow = slidesToShow;
        this.TimeoutAnimation = TimeoutAnimation;
        this.options = {
            widthSlide: (100 / this.slidesToShow),
            i: this.slidesToShow,
            posRes: (this.slideW * 0.3)
        };
        this.responsive = responsive;

    }

    ImportSlide() {
        if (this.responsive) {
            this.responsiveInit();
        }
        console.log(this.slidesToShow);
        
        /*this.CloneTwoSlide();*/
        window.addEventListener('resize', this.CloneTwoSlide());
        this.addEdClass();
        this.addEdStyle();
        window.addEventListener('resize', this.Position());
        /*this.Position();*/
        this.SlideControl();
        this.Jump();
        this.Event();
        this.Hover();
        
    }

    addEdClass() {
        this.main.classList.add('ed__slider');
        this.wrap.classList.add('ed__slides');
        for (const item of this.slide) {
            item.classList.add('ed__slider_item');
        }
    }

    addEdStyle() {
        const style = document.createElement('style');

        style.id = 'EdSlide_style';
        style.textContent = `
        .ed__slider {
            overflow: hidden;
            width: ${this.slideW * this.slidesToShow}px
        }
        .ed__slides {
            display: block;
            width: ${this.slideW * this.slide.length}px
            
        }
        .ed__slider_item {
            width: ${this.slideW}px;
            float: left;
            pointer-events: none;
        }
        `;
        document.head.append(style);
    }


    CloneTwoSlide() {
        let cloneFirst = this.slide[0].cloneNode(true);
        let cloneSecond = this.slide[1].cloneNode(true);
        let cloneThree = this.slide[2].cloneNode(true);
        let cloneFour = this.slide[3].cloneNode(true);
        let cloneLast4 = this.slide[this.slide.length - 4].cloneNode(true);
        let cloneLast3 = this.slide[this.slide.length - 3].cloneNode(true);
        let cloneLast2 = this.slide[this.slide.length - 2].cloneNode(true);
        let cloneLast1 = this.slide[this.slide.length - 1].cloneNode(true);
        if (this.slidesToShow === 1) {
            this.wrap.append(cloneFirst);
            cloneFirst.setAttribute('id', 'first');
            this.wrap.prepend(cloneLast1);
            cloneLast1.setAttribute('id', 'last');
        }
        if (this.slidesToShow === 2) {
            this.wrap.append(cloneFirst);
            cloneFirst.setAttribute('id', 'first');
            this.wrap.prepend(cloneLast1);
            cloneLast1.setAttribute('id', 'last');
            this.wrap.append(cloneSecond);
            this.wrap.prepend(cloneLast2);
        }
        if (this.slidesToShow === 3) {
            this.wrap.append(cloneFirst);
            this.wrap.prepend(cloneLast1);
            this.wrap.append(cloneSecond);
            this.wrap.prepend(cloneLast2);
            this.wrap.append(cloneThree);
            cloneThree.setAttribute('id', 'first');
            this.wrap.prepend(cloneLast3);
            cloneLast3.setAttribute('id', 'last');
        }
        if (this.slidesToShow === 4) {
            this.wrap.append(cloneFirst);
            this.wrap.prepend(cloneLast1);
            this.wrap.append(cloneSecond);
            this.wrap.prepend(cloneLast2);
            this.wrap.append(cloneThree);
            cloneFour.setAttribute('id', 'first');
            this.wrap.prepend(cloneLast3);
            cloneLast4.setAttribute('id', 'last');
            this.wrap.prepend(cloneLast4);
            this.wrap.append(cloneFour);
        }
        
    }
    Position() {
        
        this.wrap.style.transform = 'translateX(' + (-this.slideW * this.slidesToShow) + 'px)';
    }

    SlideControl() {
        this.next.addEventListener('click', this.Next.bind(this));
        this.prev.addEventListener('click', this.Prev.bind(this));
        this.wrap.addEventListener('transitionend', this.Jump.bind(this));
    }

    Next() {
        let max = this.slide.length;
        this.options.i >= max - this.slidesToShow ? false : this.options.i++;
        this.wrap.style.transition = "transform .4s ease-in-out";
        this.wrap.style.transform = 'translateX(' + (-this.options.i * (this.slideW)) + 'px)';

    }
    Prev() {
        this.options.i <= 0 ? false : this.options.i--;
        this.wrap.style.transition = "transform .4s ease-in-out";
        this.wrap.style.transform = 'translateX(' + (-this.options.i * (this.slideW)) + 'px)';
    }
    Jump() {
        if (this.options.i === this.slide.length - this.slidesToShow) {
            this.options.i = this.slidesToShow;
        }
        if (this.options.i === 0) {
            this.options.i = this.slide.length - this.slidesToShow * 2;
        }
        this.wrap.style.transition = "none";
        this.wrap.style.transform = 'translateX(' + (-this.options.i * (this.slideW)) + 'px)';

    }
    Event() {
        this.wrap.addEventListener("touchstart", this.Gets.bind(this));
        this.wrap.addEventListener("touchmove", this.Lets.bind(this));
        this.wrap.addEventListener("touchend", this.Out.bind(this));
        this.wrap.addEventListener("mousedown", this.Gets.bind(this));
        this.wrap.addEventListener("mousemove", this.Lets.bind(this));
        this.wrap.addEventListener("mouseup", this.Out.bind(this));
    };
    GetEvent() {
        return event.type.search('touch') !== -1 ? event.touches[0] : event;
    }
    Gets() {
        let evt = this.GetEvent();
        this.posInit = this.posX1 = evt.clientX;
        this.isSlide = true;
    }
    Lets() {
        let evt = this.GetEvent();
        this.posX2 = this.posX1 - evt.clientX;
        this.posX1 = evt.clientX;
        let style = this.wrap.style.transform;
        let transform = +style.match(/[-0-9.]+(?=px)/)[0];
        if (this.isSlide === true) {
            this.wrap.style.transform = 'translateX(' + (transform - this.posX2) + 'px)';
        }
    }
    Out() {
        this.posFinal = this.posInit - this.posX1;
        if (Math.abs(this.posFinal) > this.options.posRes) {
            if (this.posInit < this.posX1) {
                this.Prev();
            } else if (this.posInit > this.posX1) {
                this.Next();
            } else {

            }
        }
        this.wrap.style.transition = "transform .4s ease-in-out";
        this.wrap.style.transform = 'translateX(' + (-this.options.i * (this.slideW)) + 'px)';


        if (this.isSlide === true) {
            this.isSlide = false;
        }

    }


    Hover() {
        let mobile = false;
        let bodyWidth = document.body.clientWidth;
        if (bodyWidth <= 768) {
            mobile = true;
        }
        if (mobile) {
            let timer = setInterval(this.Next.bind(this), this.TimeoutAnimation);
            this.wrap.addEventListener("touchstart", function () {
                clearInterval(timer);
            }, this.wrap.addEventListener("touchend", () => {
                timer = setInterval(this.Next.bind(this), this.TimeoutAnimation);
            }));
        }
        if (!mobile) {
            let timer = setInterval(this.Next.bind(this), this.TimeoutAnimation);
            this.wrap.addEventListener("mouseover", function () {
                clearInterval(timer);
            },
                this.wrap.addEventListener("mouseout", () => {
                    timer = setInterval(this.Next.bind(this), this.TimeoutAnimation);
                }));
        }
    }

    responsiveInit() {
        const slidesToShowThis = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);
        const checkThisResponce = () => {
            const widthWindow = document.documentElement.clientWidth;
            
            if(widthWindow < maxResponse){
                for( let j = 0; j < allResponse.length; j++){
                    if(widthWindow < allResponse[j]){
                    this.slidesToShow = this.responsive[j].slidesToShow;
                    this.options.widthSlide = (100 / this.slidesToShow);
                    this.addEdStyle();
                    this.Position();
                    
                    }
                } 
            } else {
                this.slidesToShow = slidesToShowThis;
                this.options.widthSlide = (100 / this.slidesToShow);
                this.addEdStyle();
                this.Position();
            }
        };
        checkThisResponce();

        window.addEventListener('resize', checkThisResponce);
        window.addEventListener('resize', this.Position());
    }
    

}









let slider = new EdSlider({
    main: '.slider',
    wrap: '.ed_slider',
    slideW: '.slide',
    prev: '.prev',
    next: '.next',
    slidesToShow: 4,
    TimeoutAnimation: 10000000,
    responsive: [{
        breakpoint: 1024,
        slidesToShow: 3
    },
    {
        breakpoint: 768,
        slidesToShow: 2
    },
    {
        breakpoint: 576,
        slidesToShow: 1
    },
    ]

});
slider.ImportSlide();

