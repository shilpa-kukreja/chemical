"use client";

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  List,
  Link,
  BlockQuote,
  SourceEditing
} from "ckeditor5";

export default ClassicEditor;

export const editorConfig = {
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    List,
    Link,
    BlockQuote,
    SourceEditing
  ],
  toolbar: [
    "bold",
    "italic",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "|",
    "sourceEditing",
    "undo",
    "redo"
  ]
};