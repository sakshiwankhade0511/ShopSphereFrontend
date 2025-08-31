import React from 'react'
import { useState, useEffect } from "react";
import apiClints from '../utils/api-clints';
import { useQuery } from '@tanstack/react-query';

const UseData = (endpoint, configObj = {}, queryKey, staleTime = 300_000) => {
    const fetchFunction = () => apiClints.get(endpoint, configObj).then(res => res.data)
    return useQuery({
        queryKey : queryKey,
        queryFn : fetchFunction,
        staleTime : staleTime
    })
}

export default UseData;
