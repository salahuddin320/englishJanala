const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayData(json.data))
};

const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn=>btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        });
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if (words.length == 0){
        wordContainer.innerHTML = `
        <div class="bg-white py-10 px-5 text-center space-y-3 font-bangla col-span-full">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-sm text-[#79716B] ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-medium text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white py-10 px-5 text-center space-y-2">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নাই"}</h2>
            <p class="text-sm font-medium"> Meaning / Pronounciation </p>
            <div class="font-bangla text-2xl font-mediam">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নাই"} / ${word.pronunciation ? word.pronunciation : "pronuciation পাওয়া যায় নাই"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card);

    });
};

const displayData = (lessons) => {
    // 1.get the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2.get into every lesson
    for (let lesson of lessons) {
        console.log(lesson);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>lesson - ${lesson.level_no}
        </button>
         `
        levelContainer.append(btnDiv);
    }
};
loadLessons();