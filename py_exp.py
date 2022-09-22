

def returns_tuple_of_3():
    return 3,4,5


def accepts_tuble_of_3(one, two, three):
    print(one,two,three)


accepts_tuble_of_3(*returns_tuple_of_3())
