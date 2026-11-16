import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { FieldDef } from "../../types";
import { splitTags } from "../../utils/helpers";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

/* ---------- একটি একক ফিল্ড ---------- */

interface FieldInputProps {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function FieldInput({ field, value, onChange }: FieldInputProps) {
  if (field.type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 accent-indigo-600"
        />
        <span className="text-sm font-medium text-slate-700">{field.label}</span>
      </label>
    );
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{field.label}</label>
      {field.type === "tags" ? (
        <TagsInput value={value} placeholder={field.placeholder} onChange={onChange} />
      ) : field.type === "textarea" ? (
        <textarea
          rows={3}
          className={inputClass}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          className={inputClass}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.hint && <p className="mt-1 text-xs text-slate-400">{field.hint}</p>}
    </div>
  );
}

/** কমা-সেপারেটেড ইনপুট — লেখার সময় কমা যেন হারিয়ে না যায়, তাই লোকাল টেক্সট স্টেট রাখা হয়েছে */
function TagsInput({
  value,
  placeholder,
  onChange,
}: {
  value: unknown;
  placeholder?: string;
  onChange: (value: unknown) => void;
}) {
  const [text, setText] = useState(() => (Array.isArray(value) ? value.join(", ") : ""));
  return (
    <input
      className={inputClass}
      placeholder={placeholder}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(splitTags(e.target.value));
      }}
    />
  );
}

/* ---------- একক অবজেক্ট এডিটর (যেমন: ব্যক্তিগত তথ্য) ---------- */

interface ObjectEditorProps<T extends object> {
  fields: FieldDef[];
  value: T;
  onChange: (value: T) => void;
}

export function ObjectEditor<T extends object>({ fields, value, onChange }: ObjectEditorProps<T>) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {fields.map((field) => (
        <div key={field.key} className={field.type === "textarea" || field.type === "tags" ? "md:col-span-2" : ""}>
          <FieldInput
            field={field}
            value={(value as Record<string, unknown>)[field.key]}
            onChange={(v) => onChange({ ...value, [field.key]: v } as T)}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------- তালিকা এডিটর (অভিজ্ঞতা, শিক্ষা, প্রকল্প ইত্যাদি) ---------- */

interface ListEditorProps<T extends { id: string }> {
  items: T[];
  fields: FieldDef[];
  createItem: () => T;
  onChange: (items: T[]) => void;
  addLabel: string;
}

export function ListEditor<T extends { id: string }>({
  items,
  fields,
  createItem,
  onChange,
  addLabel,
}: ListEditorProps<T>) {
  const titleKey = fields[0]?.key ?? "id";

  const updateItem = (index: number, next: T) => {
    onChange(items.map((item, i) => (i === index ? next : item)));
  };

  const removeItem = (index: number) => {
    if (!window.confirm("এই আইটেমটি মুছে ফেলতে চান?")) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-5">
      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
          এখনো কোনো আইটেম নেই। নিচের বাটন দিয়ে যোগ করুন।
        </p>
      )}

      {items.map((item, index) => {
        const heading = String((item as Record<string, unknown>)[titleKey] ?? "").trim();
        return (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h4 className="font-semibold text-slate-800">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs text-indigo-700">
                  {index + 1}
                </span>
                {heading || "(নতুন আইটেম)"}
              </h4>
              <div className="flex items-center gap-1">
                <IconBtn label="উপরে" onClick={() => move(index, -1)} disabled={index === 0}>
                  <ArrowUp className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="নিচে" onClick={() => move(index, 1)} disabled={index === items.length - 1}>
                  <ArrowDown className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="মুছুন" danger onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" || field.type === "tags" ? "md:col-span-2" : ""}>
                  <FieldInput
                    field={field}
                    value={(item as Record<string, unknown>)[field.key]}
                    onChange={(v) => updateItem(index, { ...item, [field.key]: v } as T)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => onChange([...items, createItem()])}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 py-3 font-medium text-indigo-700 transition hover:border-indigo-500 hover:bg-indigo-50"
      >
        <Plus className="h-5 w-5" /> {addLabel}
      </button>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-30 ${
        danger ? "text-rose-500 hover:bg-rose-50" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
      }`}
    >
      {children}
    </button>
  );
}
