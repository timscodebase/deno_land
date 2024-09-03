import { parseArgs } from "jsr:@std/cli/parse-args";

import { createTodo, todosDB, todoSchema } from "./db/index.ts";

const flags = parseArgs(Deno.args, {
  boolean: ["c", "e", "h", "l", "create", "edit", "help", "list"],
  string: ["task", "version"]
});

console.log("Flags: ", flags);

const isCreate = flags.create || flags.c;
const isEdit = flags.edit || flags.e;
const isHelp = flags.help || flags.h;
const isList = flags.list || flags.l;
const showVersion = flags.version || flags.v;

const setupCLI = () => {
  const otherArgs = flags._;

  if (showVersion) {
    console.log("todo version 0.0.1");

    Deno.exit(0);
  }

  if (isHelp) {
    console.log(`
      --create     Create a new todo
      --edit       Edit an existing todo
      --help       Show this help
      --list       List all todos
      --version    Show version
    `);

    Deno.exit(0);
  }

  if (isCreate && isEdit && isHelp && isList) {
    console.log("You may only specify one of --create, --edit or --list. Please try again.");
    setupCLI();
  }

  if (isCreate) {
    console.log("create");

    createTodo(Deno.args[0]);

    Deno.exit(1);
  }

  if (isEdit) {
    console.log("edit");

    Deno.exit(2);
  }

  if (isList) {
    console.log("list");

    Deno.exit(3);
  }
}

setupCLI();