"use client";

import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  SUBJECT = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });

  const [step, setStep] = useState(STEPS.SUBJECT);

  const [subject, setSubject] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      let newVal: string;
      let val = JSON.stringify(data.search);

      if (val.at(0) === '"' && val.at(-1) === '"') {
        newVal = val.slice(1, -1);
        setSubject(newVal);
      }

      const updatedQuery: any = {
        ...currentQuery,
        subject,
      };

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      setStep(STEPS.SUBJECT);
      searchModal.onClose();
      router.push(url);
    },
    [searchModal, router, subject, params]
  );

  const actionLabel = useMemo(() => {
    return "Search";
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Search Subjects" subtitle="Find a subject here" />
      <Input
        id="search"
        label="Search Subject"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
