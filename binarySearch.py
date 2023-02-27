a = [2, 5, 14, 23, 92, 234, 567, 982, 983, 998]

def search(inizio, fine, array, elem):
	i = (fine + inizio) // 2
	if inizio >= fine:
		print("elemento non trovato")
		return
	if array[i] == elem:
		print("elemento trovato")
		return elem
	elif array[i] < elem:
		return search(i+1, len(array[i:]) -1, array[i:], elem)
	else:
		return search(inizio, i-1, array[:i], elem)
	
search(0, len(a)-1, a, 92)