export enum Patterns {
    ONLY_NUMBERS = "^[0-9]*$",
    STRONG_PASSWORD = "?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
    ONLY_LETTERS = "[a-zA-Z]*"
}