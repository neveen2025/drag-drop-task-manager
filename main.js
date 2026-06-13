let btn = document.getElementById('btn');
let inp = document.getElementById('inp');
let boxes = document.querySelectorAll('.box');
let draggedItem = null;

// إضافة عناصر جديدة
btn.onclick = function () {
    if (inp.value != '') {
        let p = document.createElement('p');
        p.className = 'item';
        p.draggable = true;

        // محتوى العنصر مع زر حذف
        p.innerHTML = `${inp.value} <button class="delete">X</button>`;

        boxes[0].appendChild(p);
        inp.value = '';

        addDragEvents(p);
        addDeleteEvent(p);
    }
}

// وظيفة السحب
function addDragEvents(item) {
    item.addEventListener('dragstart', function () {
        draggedItem = item;
        setTimeout(() => {
            item.style.display = 'none';
        }, 0);
    });

    item.addEventListener('dragend', function () {
        draggedItem = null;
        item.style.display = 'flex';
        boxes.forEach(box => box.classList.remove('highlight'));
    });
}

// إعداد Boxes لقبول السحب مع Highlight
boxes.forEach(box => {
    box.addEventListener('dragover', function (e) {
        e.preventDefault();
        box.classList.add('highlight');
    });
    box.addEventListener('dragleave', function () {
        box.classList.remove('highlight');
    });
    box.addEventListener('drop', function () {
        if (draggedItem) {
            box.appendChild(draggedItem);
        }
        box.classList.remove('highlight');
    });
});

// وظيفة حذف العناصر
function addDeleteEvent(item) {
    let delBtn = item.querySelector('.delete');
    delBtn.addEventListener('click', function () {
        item.remove();
    });
}
