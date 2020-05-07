function select(selector, element) {
    let result = null
    if (element) {
        result = element.querySelectorAll(selector)
    } else {
        result = document.querySelectorAll(selector)
    }

    if (result.length) {
        return result[0]
    } else {
        return null
    }
}

function main() {
    // Loop
    setTimeout( main, 500 );

    const previewForm = select('.new-pr-form');

    // PRs can't be created from some comparison pages:
    // Either base is a tag, not a branch; or there already exists a PR.
    if (!previewForm) {
        return;
    }

    const buttonBar = select('.new-pr-form .timeline-comment > :last-child');
    const createPrButtonGroup = select('.BtnGroup', buttonBar);
    if (!createPrButtonGroup) {
        // Free accounts can't open Draft PRs in private repos, so this element is missing
        return false;
    }

    const createPrDropdownItems = createPrButtonGroup.querySelectorAll('.select-menu-item');

    for (const dropdownItem of createPrDropdownItems) {
        let title = select('.select-menu-item-heading', dropdownItem).textContent.trim();
        const description = select('.description', dropdownItem).textContent.trim();
        const radioButton = select('input[type=radio]', dropdownItem);
        const classList = ['btn', 'ml-2', 'tooltipped', 'tooltipped-s'];

        if (/\bdraft\b/i.test(title)) {
            title = 'Create draft PR';
            classList.push('btn-primary');
        }

        var div = document.createElement('div');
        var html = `
            <button class="${classList.join(' ')}" aria-label="${description}" type="submit" name="${radioButton.name}" value="${radioButton.value}">
                ${title}
            </button>
        `
        div.innerHTML = html.trim();

        buttonBar.prepend(div.firstChild);
    }

    createPrButtonGroup.remove();
}

main();
