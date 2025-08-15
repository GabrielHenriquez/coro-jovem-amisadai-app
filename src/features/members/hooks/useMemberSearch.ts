import { useMemo, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { IMember } from "../domain/entities/Member";
import { SEARCH_DEBOUNCE_MS } from "../constants";

export const useMemberSearch = (data: IMember[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);

  const filteredMembers = useMemo(() => {
    if (!data) return [];

    if (!debouncedSearchTerm?.trim()) return data as IMember[];

    return (data as IMember[]).filter((item: IMember) =>
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data, debouncedSearchTerm]);

  const resetSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    filteredMembers,
    resetSearch,
  };
};
