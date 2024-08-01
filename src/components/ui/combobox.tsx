import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem, CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type SelectionList = {
    value: number,
    label: string,
}

export function Combobox({selectionList}: { selectionList: SelectionList[] | [] }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<number>();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] h-[60px] justify-between bg-[#E8E8E8] hover:bg-[#ECECEC]"
                >
                    {value
                        ? selectionList.find((item) => item.value === value)?.label
                        : "Select group..."}
                    <CaretSortIcon color="orange" className="ml-2 h-8 w-8 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search group..." className="h-12" />
                    <CommandEmpty>No groups found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {selectionList.map((item) => (
                                <CommandItem
                                    className="p-3"
                                    key={item.value}
                                    value={item.value as unknown as string}
                                    onSelect={() => {
                                        setValue(item.value)
                                        setOpen(false)
                                    }}
                                >
                                    {item.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
