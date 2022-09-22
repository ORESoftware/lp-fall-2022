
""""
Assignment #2. Using Commercial Codes (e.g., Matlab) routines; Due: Sep 30, 2022
Use a mathematical software package like Matlab, Python or similar to solve the same set of simultaneous
equations (Bx = b) that you solved in Assignment # 1.  Obtain solutions four different ways: (1) with the
LU factorization routines that come with the software (these are sometimes called LFTRG and LFSRG),
(2) with the routine that solves Bx = b directly (LSLRG), and (3) by first finding an inverse of a square
matrix (LINRG) and then computing the product of a matrix and a vector (MURRV), (4) with the
    Cholesky factors (CHFAC and LFSDS) (This routine requires a symmetric, positive-definite matrix so
create D =
1
2 B +BT
() and try to solve Dx = b.  This will only work if D is positive definite.  Try a few
matrices to see what happens.  If D is not positive definite, add a large number to each diagonal element
and try again.)  Note that the names of the routines in parentheses refer to the IMSL package of
subroutines which we no longer have access to.

For Matlab, go to
https://ut.service-now.com/sp?id=ut_bs_service_detail&sys_id=f9d65c7c4ff9d200f6897bcd0210c77d

https://students.engr.utexas.edu/it-resources

For computational information, see
http://www.mathworks.com/access/helpdesk/help/techdoc/index.html?/access/helpdesk/help/techdoc/mat
h/f4-987971.html&http://www.mathworks.com/cgi-
                        bin/texis/webinator/search/?db=MSS&prox=page&rorder=750&rprox=750&rdfreq=500&rwfreq=500&rl
ead=250&sufs=0&order=r&is_summary_on=1&ResultCount=10&query=linear+algebra&submitButton
Name=Search
"""

from docplex.mp.model import Model

import json

input_file = open ('10x10-matrix.json')
json_array = json.load(input_file)
store_list = []

for item in json_array:
    print(item)

import pandas as pd

d = {'col1': [1, 2], 'col2': [3, 4]}
df = pd.DataFrame(data=d)


m = Model(name='single variable')
x = m.continuous_var(name="x", lb=0)
c1 = m.add_constraint(x >= 2, ctname="const1")
m.set_objective("min", 3*x)
m.print_information()
m.solve()
m.print_solution()