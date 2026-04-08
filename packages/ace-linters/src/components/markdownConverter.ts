import {MarkDownConverter} from "../types/converters";
import {marked} from "marked";
import DOMPurify from 'dompurify';

export const defaultMarkdownConverter: MarkDownConverter = {
    makeHtml(markdownText: string) {
        return DOMPurify.sanitize(marked.parse(markdownText, {async: false}));
    }
}