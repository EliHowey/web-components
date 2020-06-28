/**
 * Creates an HTML `<template>` element from a tagged template literal string.
 */
export function htmlTemplate(strings, ...values) {
    const templateEl = document.createElement('template');

    let innerHTML = '';
    strings.forEach((str, i) => {
        innerHTML += `${str}${values[i] || ''}`;
    });

    templateEl.innerHTML = innerHTML;
    return templateEl;
}
