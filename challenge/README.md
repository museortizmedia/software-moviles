# Challenge 1
- Se instaló react en JS y se sumó Tailwind

## Orden de carpetas
- src/
- - components/
- - - ContactCard.jsx
- - - CommonInput.jsx
- - - CommonButton.jsx
- - - ContactCard.jsx
- - - FullScreenLoader.jsx
- - pages/
- - - PageContactsList.jsx
- - - PageContactsCreator.jsx
- - services/
- - - indexedDB.js
- - main.jsx
- - style.css : with Tailwind

## Ejecución
- El main controla el loader, también tiene el botón que abre el creator y el list.
- Creator tiene modo creación o  edicion, segun si currentContact es null o no, esto ayuda a editar
- List encapsula la logica de filtro y muestra Card
- Card meustra el cotnacto, tiene botón crear y editar, edicar cambia el estado del currentContact y el eliminar usa el servicio de base de datos para eliminar y refrescar.