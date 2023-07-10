import { Toaster } from '@app/shared/types';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { removeToaster } from '@app/stores/slices';
import React, { useEffect, useState } from 'react';

interface IToasterHook {
  open: boolean;
  messageInfo: Toaster | null;
  setMessageInfo: React.Dispatch<React.SetStateAction<Toaster | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useToasterMessage = (): IToasterHook => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<Toaster | null>(null);
  const { toastersList } = useAppSelector(state => state.toaster);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toastersList.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...toastersList[0] });
      dispatch(removeToaster());
      setOpen(true);
    } else if (toastersList.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [toastersList, messageInfo, open, dispatch]);

  return { open, setOpen, messageInfo, setMessageInfo };
};
