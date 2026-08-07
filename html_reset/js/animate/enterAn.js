function initAnimation(){

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            const target = entry.target;

            if(target.classList.contains("an-once")){

                if(entry.isIntersecting){

                    target.classList.add("is-active");

                    observer.unobserve(target);

                }

            }

            if(target.classList.contains("an-repeat")){

                if(entry.isIntersecting){

                    target.classList.add("is-active");

                }else{

                    target.classList.remove("is-active");

                }

            }

        });

    },{
        threshold:.2
    });

    document
        .querySelectorAll(".an-once,.an-repeat")
        .forEach(el=>observer.observe(el));

}