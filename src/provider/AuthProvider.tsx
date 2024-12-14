
import { selectCurrentToken, setUser } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/features/category/authApi";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const token = useAppSelector(selectCurrentToken);

    const { data, isLoading, refetch, isSuccess, isError, isFetching, } = useGetMyProfileQuery(token as string, {
      skip: !token,
    });
  useEffect(() => {
    

    if (isSuccess) {
      dispatch(setUser({ user: data?.userData }));
   
    }
  }, [isFetching, isSuccess, dispatch, data?.userData ]);

  return <>{children}</>;
};

export default AuthProvider;
