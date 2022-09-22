import numpy as np
import pandas as pd
import random

from scipy.sparse import rand

def random_matrix (U, L, density, m, n):
    #define a matrix of random values between 0 and 1 of specific density and size
    matrix=rand(m,n,density)
    #interpolate between upper and lower bounds with randomly generated number
    matrix = matrix*(U-L)+L
    #convert array to dataframe
    matrix_df=pd.DataFrame(matrix.toarray())
    #cycle through rows and check if all values in row are zero
    for row in matrix_df.index:
        if (matrix_df.loc[row,:]==0).all():
            # print("restarting")
            #if all values in row are zero, restart function
            return random_matrix(U,L,density,m,n)
    #cycle through columns and check if all values in column are zero
    for col in matrix_df.columns:
        if (matrix_df.loc[:,col]==0).all():
            #if all values in column are zero, restart function
            print("restarting")
            return random_matrix(U,L,density,m,n)

    return matrix.toarray()


A=random_matrix(100,0,0.4,10,10)
# b=random_matrix(100,0,0.8,10,1)

print(A)